const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    qty             : Number,
    shippingDetails : String,
    total           : Number,
    isActive        : Boolean,
    cart            : [ {
        type : Schema.Types.ObjectId,
        ref  : 'cart',
    } ],
    user : {
        type : Schema.Types.ObjectId,
        ref  : 'user',
    },

}, { collection: 'order' });

module.exports = mongoose.model('order', OrderSchema);
