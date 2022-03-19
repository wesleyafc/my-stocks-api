const Deposit = require('../../src/models/Deposit')

//create new deposit
module.exports.createNewDeposit = async function (req, res) {
    const { newDeposit, totalDeposals } = req.body
    const deposit = new Deposit({ newDeposit, totalDeposals })
    deposit.save()
        .then(() => {
            res.status(200).json(deposit)
        })
        .catch(error => {
            res.send(error)
        })
}

//show all deposits
module.exports.allDeposits = async function (req, res) {
    Deposit.find()
        .then(deposits => {
            res.status(200).json(deposits)
        })
        .catch(error => {
            res.send(error)
        })
}

//show one single deposit
module.exports.singleDeposit = async function (req, res) {
    Deposit.findById(req.params.id)
        .then(deposit => {
            res.status(200).json(deposit)
        })
        .catch(error => {
            res.send(error)
        })
}

//update one deposit
module.exports.updateDeposit = async function (req, res) {
    Deposit.findByIdAndUpdate(req.params.id, req.body)
        .then(deposit => {
            res.status(200).json(deposit)
        })
        .catch(error => {
            res.send(error)
        })
}

//delete one deposit
module.exports.deleteDeposit = async function (req, res) {
    Deposit.findByIdAndDelete(req.params.id)
        .then(deposit => {
            res.status(200).json(deposit)
        })
        .catch(error => {
            res.send(error)
        })
}