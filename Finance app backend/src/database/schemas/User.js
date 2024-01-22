const mongoose = require('mongoose')
//creates new instance of schema
const UserSchema = new mongoose. Schema ({
    username: {
    type: mongoose. SchemaTypes.String,
    required: true,
    },
    password: {
    type: mongoose. SchemaTypes.String,
    required: true,
    },
    email: {
    type: mongoose. SchemaTypes.String,
    required: true,
    },
    createdAt: {
    type: mongoose. SchemaTypes.Date,
    required: true,
    // creates automatically
    default: new Date(),
    },
});

module.exports = mongoose.model('users',UserSchema);
