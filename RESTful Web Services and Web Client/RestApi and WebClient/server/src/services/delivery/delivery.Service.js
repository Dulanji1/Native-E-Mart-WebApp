const { ObjectId } = require('mongoose').Types;
const { Delivery } = require("../../models");
const { DeliveryType } = require('../../types');

const DeliveryService = {
    findByDeliveryId : async (code) =>
    {
        const data = await Delivery.find().or({ deliveryId: code });

        return data;
    },
    findById : async (id) =>
    {
        console.log(`in service + ${id}`);

        const data = await Delivery.findOne({ _id: ObjectId(id) });

        console.log(data);

        return data;
    },
    findAll : async () =>
    {
        const data = await Delivery.find({});

        return data;
    },
    create : async (deliveryData) =>
    {
        try
        {
            // check data validation
            const request = Object.setPrototypeOf(deliveryData, DeliveryType.prototype);

            console.log("in service");

            if (!request.isValid())
            {
                return null;
            }
            // check already exists
            const existingData = await DeliveryService.findByDeliveryId(request.deliveryId);

            console.log(`exists : ${existingData}`);
            if (existingData.length > 0) return null;

            const delivery = new Delivery({
                deliveryId     : request.deliveryId,
                name           : request.name,
                address        : request.address,
                email          : request.email,
                phone          : request.phone,
                cashOnDelivery : request.cashOnDelivery,
                deliveryType   : request.deliveryType,
                costPerKm      : request.costPerKm,
                isActive       : true,
            });

            console.log(delivery);

            // create item
            const data = await delivery.save();

            console.log(data);

            return data;
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },
    update : async (deliveryData) =>
    {
        try
        {
            // check already exists
            const existingData = await DeliveryService.findById(deliveryData._id);

            // console.log(`existingItem + ${existingItem}`);

            if (existingData.length < 1) return null;

            const data = await Delivery.updateOne(
                { _id: ObjectId(deliveryData._id) },
                {
                    $set : {
                        deliveryId     : deliveryData.deliveryId,
                        name           : deliveryData.name,
                        address        : deliveryData.address,
                        email          : deliveryData.email,
                        phone          : deliveryData.phone,
                        cashOnDelivery : deliveryData.cashOnDelivery,
                        deliveryType   : deliveryData.deliveryType,
                        costPerKm      : deliveryData.costPerKm,
                    },
                },
            );

            return data;
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },
    deleteById : async (id) =>
    {
        console.log(`in service + ${id}`);

        const data = await Delivery.deleteOne({ _id: ObjectId(id) });

        console.log(data);

        return data;
    },
};

module.exports = DeliveryService;
