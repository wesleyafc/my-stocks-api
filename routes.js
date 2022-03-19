const express = require('express')
const Transaction = require('./src/models/NewBuy')
const Deposit = require('./src/models/Deposit')
const router = express.Router()

//all transactions
router.get('/transactions', (req, res) => {
    res.send('hi')
})


//create new deposit
router.post('/deposit', (req, res) => {
    const { newDeposit, totalDeposals } = req.body
    const deposit = new Deposit({ newDeposit, totalDeposals })
    deposit.save()
        .then(() => {
            res.status(200).json(deposit)
        })
        .catch(error => {
            res.send(error)
        })
})

//create a new transaction
router.post('/buy', async (req, res) => {
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
})

//get all buys
router.get('/buys', (req, res) => {
    Transaction.find()
        .then(transactions => {
            res.status(200).json(transactions)
        })
        .catch(error => {
            res.send(error)
        })
})

//get all deposits
router.get('/deposits', (req, res) => {
    Deposit.find()
        .then(deposits => {
            res.status(200).json(deposits)
        })
        .catch(error => {
            res.send(error)
        })
})

//get one buy transaction
router.get('/buy/:id', (req, res) => {
    Transaction.findById(req.params.id)
        .then(transaction => {
            res.status(200).json(transaction)
        })
        .catch(error => {
            res.send(error)
        })
})

//get one deposit
router.get('/deposit/:id', (req, res) => {
    Deposit.findById(req.params.id)
        .then(deposit => {
            res.status(200).json(deposit)
        })
        .catch(error => {
            res.send(error)
        })
})

//update one transaction
router.put('/buy/:id', (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, req.body)
        .then(transaction => {
            res.status(200).json(transaction)
        })
        .catch(error => {
            res.send(error)
        })
})

//update one deposit
router.put('/deposit/:id', (req, res) => {
    Deposit.findByIdAndUpdate(req.params.id, req.body)
        .then(deposit => {
            res.status(200).json(deposit)
        })
        .catch(error => {
            res.send(error)
        })
})

//delete one transaction buy
router.delete('/buy/:id', (req, res) => {
    Transaction.findByIdAndDelete(req.params.id)
        .then(transaction => {
            res.status(200).json(transaction)
        })
        .catch(error => {
            res.send(error)
        })
})

//delete one deposit
router.delete('/deposit/:id', (req, res) => {
    Deposit.findByIdAndDelete(req.params.id)
        .then(deposit => {
            res.status(200).json(deposit)
        })
        .catch(error => {
            res.send(error)
        })
})

router.get('/', (req, res) => {
    res.send('H3ll0 W0RlD')
})



















module.exports = router