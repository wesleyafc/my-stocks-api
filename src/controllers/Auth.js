const User = require('../models/CreateNewAccount')
const bcrypt = require('bcrypt')

module.exports.createNewAccount = async function (req, res) {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    //create new user account 
    const NewAccount = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,

    })

    //find in db username and email exist
    await User.find({
        $or: [
            { username: req.body.username },
            { email: req.body.email },
        ]
    })
        .then(user => {
            if (user.length > 0) {
                res.status(400).json({
                    message: 'username or email already exist'
                })
            } else {
                NewAccount.save()
                    .then(() => {
                        res.status(200).json({
                            message: 'account created successfully'
                        })
                    })
                    .catch(error => {
                        res.send(error)
                    })
            }
        })

}

module.exports.login = async function (req, res) {
    const user = await User.findOne({
        username: req.body.username,
    })

    if (!user) {
        res.status(400).json({
            message: 'username or password is incorrect'
        })
    } else {
        const authenticated = await bcrypt.compare(req.body.password, user.password)
        const { password, ...other } = user._doc
        if (!authenticated) {
            res.status(400).json({
                message: 'username or password is incorrect'
            })
        } else {
            res.status(200).json({
                message: 'authenticated successfully',
                other
            })
        }
    }
}