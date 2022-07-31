const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name           : String,
    email          : String,
    password       : String,
    phone          : String,
    emailConfirmed : Boolean,
    role           : {
        type : Schema.Types.ObjectId,
        ref  : 'role',
    },
}, { collection: 'user' });

module.exports = mongoose.model('user', UserSchema);
