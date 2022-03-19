const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema({
    newDeposit: {
        type: Number,
        required: true,
    },
    totalDeposals: {
        type: Number,
    }
}, { timestamps: true })


module.exports = mongoose.model('Deposit', DepositSchema)