const { ObjectId } = require('mongoose').Types;

const { Cart } = require("../../models");
const { CartType } = require('../../types');
const ItemsService = require('../items/item.service');
const UserService = require('../user/user.service');

const CartService = {

    findById : async (id) =>
    {
        const data = await Cart.find({ _id: ObjectId(id) });

        return data;
    },
    findAll : async () =>
    {
        const data = await Cart.find({});

        return data;
    },
    create : async (cartData) =>
    {
        try
        {
            // check data validation
            const request = Object.setPrototypeOf(cartData, CartType.prototype);

            console.log("in service");

            if (!request.isValid())
            {
                return null;
            }
            // check already exists
            const existingCart = await CartService.findById(request._id);

            console.log(`exists : ${existingCart}`);

            if (existingCart.length > 0) return null;

            // check item
            const item = await ItemsService.findById(request.item);

            console.log(`item + ${item[0]._id}`);

            if (!item)
            {
                return null;
            }

            // check user
            const user = await UserService.findByEmail(request.user);

            console.log(user);

            if (!user)
            {
                return null;
            }

            const cart = new Cart({
                item     : item[0]._id,
                name     : request.name,
                user     : user._id,
                qty      : request.qty,
                isActive : true,
            });

            console.log(`cart + ${cart}`);

            // create cart
            const data = await cart.save();

            console.log(data);

            return data;
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },
    update : async (cartData) =>
    {
        try
        {
            const existingItem = await CartService.findById(cartData._id);

            console.log(`existingItem + ${existingItem}`);

            if (existingItem.length < 1) return null;

            const item = await ItemsService.findById(cartData.item);

            console.log(`item + ${item[0]}`);
            if (!item)
            {
                return null;
            }

            const user = await UserService.findByEmail(cartData.user);

            console.log(`user+ ${user}`);

            if (!user)
            {
                return null;
            }

            const data = await Cart.updateOne(
                { _id: ObjectId(cartData._id) },
                {
                    $set : {
                        qty  : cartData.qty,
                        name : cartData.name,
                        item : item[0]._id,
                        user : user._id,
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

        const data = await Cart.deleteOne({ _id: ObjectId(id) });

        // console.log(data);

        return data;
    },

};

module.exports = CartService;
