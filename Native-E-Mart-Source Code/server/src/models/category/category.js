const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
    name     : String,
    isActive : Boolean,
    items    : [ {
        type : Schema.Types.ObjectId,
        ref  : 'item',
    } ],
}, { collection: 'category' });

module.exports = mongoose.model('category', CategorySchema);
