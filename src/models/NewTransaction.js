const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    actionsName: {
        type: String,
        required: true,
    },
    quotasAmmount: {
        type: Number,
        required: true,
    },
    singleQuotaValue: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', TransactionSchema)