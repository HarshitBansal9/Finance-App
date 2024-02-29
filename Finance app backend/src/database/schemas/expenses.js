const mongoose = require('mongoose')
const expenseSchema = new mongoose.Schema({
    expense: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    category: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    user: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        // creates automatically
        default: new Date(),
    },
})

module.exports = mongoose.model('expenses', expenseSchema);