const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoleSchema = new Schema({
    name     : String,
    priority : Number,
    isActive : Boolean,
    users    : [ {
        type : Schema.Types.ObjectId,
        ref  : 'user',
    } ],
}, { collection: 'role' });

module.exports = mongoose.model('role', RoleSchema);
