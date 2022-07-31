const { ObjectId } = require('mongoose').Types;
const { Items } = require("../../models");
const { ItemType } = require('../../types');
const CategoryService = require('../category/category.service');

const ItemService = {
    findByItemCode : async (code) =>
    {
        const data = await Items.find().or({ itemCode: code });

        return data;
    },
    findById : async (id) =>
    {
        // console.log(`in service findById + ${id}`);

        const data = await Items.find({ _id: ObjectId(id) });

        // console.log(data);

        return data;
    },
    findAll : async () =>
    {
        const data = await Items.find({});

        return data;
    },
    create : async (itemData) =>
    {
        try
        {
            // check data validation
            const request = Object.setPrototypeOf(itemData, ItemType.prototype);

            // console.log("in service");

            if (!request.isValid())
            {
                return null;
            }
            // check already exists
            const existingItem = await ItemService.findByItemCode(request.itemCode);

            // console.log(`exists : ${existingItem}`);

            if (existingItem.length > 0) return null;

            // check category
            const category = await CategoryService.find(request.category);

            // console.log(category);

            if (!category)
            {
                return null;
            }

            const item = new Items({
                name        : request.name,
                description : request.description,
                itemCode    : request.itemCode,
                buyPrice    : request.buyPrice,
                sellPrice   : request.sellPrice,
                weight      : request.weight,
                quantity    : request.quantity,
                img         : request.img,
                category    : category._id,
                isActive    : true,
            });

            // console.log(item);

            // create item
            const data = await item.save();

            // console.log(data);

            return data;
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },
    update : async (ItemData) =>
    {
        try
        {
            // check already exists
            const existingItem = await ItemService.findById(ItemData._id);

            // console.log(`existingItem + ${existingItem}`);

            if (existingItem.length < 1) return null;

            const category = await CategoryService.findByName(ItemData.category);

            // console.log(`category + ${category[0]}`);

            if (!category)
            {
                return null;
            }

            const data = await Items.updateOne(
                { _id: ObjectId(ItemData._id) },
                {
                    $set : {
                        name        : ItemData.name,
                        description : ItemData.description,
                        itemCode    : ItemData.itemCode,
                        buyPrice    : ItemData.buyPrice,
                        sellPrice   : ItemData.sellPrice,
                        weight      : ItemData.weight,
                        quantity    : ItemData.quantity,
                        img         : ItemData.img,
                        category    : category[0]._id,
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
        // console.log(`in service + ${id}`);

        const data = await Items.deleteOne({ _id: ObjectId(id) });

        // console.log(data);

        return data;
    },
};

module.exports = ItemService;
