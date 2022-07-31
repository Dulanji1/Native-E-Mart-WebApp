const mongoose = require('mongoose');

const { Schema } = mongoose;

const TokenSchema = new Schema({
    token      : String,
    createDate : Date,
    isActive   : Boolean,
    email      : String,
}, { collection: 'token' });

module.exports = mongoose.model('token', TokenSchema);
