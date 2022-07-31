const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema({
    name        : String,
    description : String,
    itemCode    : String,
    buyPrice    : Number,
    sellPrice   : Number,
    weight      : Number,
    quantity    : Number,
    isActive    : Boolean,
    img         : String,
    category    : {
        type : Schema.Types.ObjectId,
        ref  : 'category',
    },
}, { collection: 'item' });

module.exports = mongoose.model('item', ItemSchema);
