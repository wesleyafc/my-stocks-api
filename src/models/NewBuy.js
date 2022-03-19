const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    actionsName: {
        type: String,
        required: true,
    },
    quotasAcmount: {
        type: Number,
        required: true,
    },
    singleQuotaValue: {
        type: Number,
        required: true,
    },
    totalValue: {
        type: Number,
    },
}, { timestamps: true })

module.exports = mongoose.model('Transaction', TransactionSchema)