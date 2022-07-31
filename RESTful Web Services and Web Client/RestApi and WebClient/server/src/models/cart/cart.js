const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema({
    name     : String,
    isActive : Boolean,
    user     : {
        type : Schema.Types.ObjectId,
        ref  : 'user',
    },
    item : {
        type : Schema.Types.ObjectId,
        ref  : 'item',
    },
    qty : Number,

}, { collection: 'cart' });

module.exports = mongoose.model('cart', CartSchema);
