const mongoose = require('mongoose');

const { Schema } = mongoose;

const DeliverySchema = new Schema({
    deliveryId     : String,
    name           : String,
    address        : String,
    email          : String,
    phone          : Number,
    cashOnDelivery : String,
    deliveryType   : String,
    costPerKm      : String,
    isActive       : Boolean,
}, { collection: 'delivery' });

module.exports = mongoose.model('delivery', DeliverySchema);
