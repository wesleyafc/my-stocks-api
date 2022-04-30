const User = require('../models/Account')
const Transaction = require('../models/NewTransaction')
const bcrypt = require('bcrypt')


module.exports.updateUser = async function (req, res) {
    if (req.body.userId === req.params.id) {

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        try {
            const updatedUser = await User.findOneAndUpdate(req.params.id, {
                $set: req.body

            }, { new: true })
            res.status(200).json({
                message: 'user updated successfully',
                updatedUser
            })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json({
            message: "You are not authorized to update this user"
        })
    }

}

module.exports.deleteUser = async function (req, res) {
    //verify if the user exists before deleting

    if (req.body.userId === req.params.id) {

        try {
            const user = await User.findByIdAndDelete(req.params.id)

            try {
                await Transaction.deleteMany({ username: user.username })
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json()


            } catch (err) {
                res.status(500).json(err)
            }

        } catch (error) { }
    } else {
        res.status(403).json({
            message: "You are not authorized to delete this user"
        })
    }
}

module.exports.showUser = async function (req, res) {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
}

