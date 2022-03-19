const Transaction = require('../models/NewTransaction')

//create new transaction
module.exports.createNewTransaction = async function (req, res) {
    const { description,
        actionsName,
        quotasAcmount,
        singleQuotaValue,
        totalValue
    } = req.body
    const transaction = new Transaction({
        description,
        actionsName,
        quotasAcmount,
        singleQuotaValue,
        totalValue
    })
    await transaction.save()
        .then(() => {
            res.status(200).json(transaction)
        })
        .catch(error => {
            res.send(error)
        })
}

//show all transactions
module.exports.allTransactions = async function (req, res) {
    await Transaction.find()
        .then(transactions => {
            res.status(200).json(transactions)
        })
        .catch(error => {
            res.send(error)
        })
}

//get one buy transaction
module.exports.singleTransaction = async function (req, res) {
    Transaction.findById(req.params.id)
        .then(transaction => {
            res.status(200).json(transaction)
        })
        .catch(error => {
            res.send(error)
        })
}

//update one transaction
module.exports.updateTransaction = async function (req, res) {
    try {
        const _id = req.params.id

        const { description,
            actionsName,
            quotasAcmount,
            singleQuotaValue,
            totalValue,
        } = req.body

        const updatedTransaction = await Transaction.findOne({ _id })


        updatedTransaction.description = description
        updatedTransaction.actionsName = actionsName
        updatedTransaction.quotasAcmount = quotasAcmount
        updatedTransaction.singleQuotaValue = singleQuotaValue
        updatedTransaction.totalValue = totalValue

        await updatedTransaction.save()
            .then(() => {
                res.status(200).json(updatedTransaction)
            })
            .catch(error => {
                res.send(error)
            })



    } catch (error) {
        return res.status(500).json({ "error": error })
    }
}

//delete a transaction
module.exports.deleteTransaction = async function (req, res) {
    Transaction.findByIdAndDelete(req.params.id)
        .then(transaction => {
            res.status(200).json(transaction)
        })
        .catch(error => {
            res.send(error)
        })
}