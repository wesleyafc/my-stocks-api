const express = require('express');
const router = express.Router();
const DepositController = require('../controllers/Deposit');
const IndexController = require('../controllers/Index')
const TransactionController = require('../controllers/Transaction')
const AuthController = require('../controllers/Auth')

//home page
router.get('/', IndexController.index);
/**
 * auth routes
 */

router.post("/sign-up", AuthController.createNewAccount)
router.post("/login", AuthController.login)

/**
 * Deposit routes
 */

router.post('/deposit', DepositController.createNewDeposit);

router.get('/deposits', DepositController.allDeposits);

router.get('/deposit/:id', DepositController.singleDeposit);

router.put('/deposit/:id', DepositController.updateDeposit)

router.delete('/deposit/:id', DepositController.deleteDeposit);

/** 
 * Transaction routes
*/

router.post('/transaction', TransactionController.createNewTransaction)

router.get('/transactions', TransactionController.allTransactions)

router.get('/transaction/:id', TransactionController.singleTransaction)

router.put('/transaction/:id', TransactionController.updateTransaction)

router.delete('/transaction/:id', TransactionController.deleteTransaction)

module.exports = router