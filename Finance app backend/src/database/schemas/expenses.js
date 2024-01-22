const mongoose = require('mongoose')
const expenseSchema = new mongoose.Schema({
    expense:{
        type:mongoose.SchemaTypes.Number,
        required:true,
    },
    category:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    user:{
        type:mongoose.SchemaTypes.String,
        required:true,
    }
})

module.exports = mongoose.model('expenses',expenseSchema);