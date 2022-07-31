const { ObjectId } = require('mongoose').Types;
const { Order } = require("../../models");
const { OrderType } = require('../../types');
const CartService = require('../cart/cart.service');
const ItemsService = require('../items/item.service');
const UserService = require('../user/user.service');

const OrderService = {

    findById : async (_id) =>
    {
        const data = await Order.find({ _id: ObjectId(_id) });

        return data;
    },
    findAll : async () =>
    {
        const data = await Order.find({});

        return data;
    },
    create : async (orderData) =>
    {
        try
        {
            // check data validation
           // const request = Object.setPrototypeOf(orderData, OrderType.prototype);

            console.log("in service");

            // if (!request.isValid())
            // {
            //     return null;
            // }

            // check user
            const user = await UserService.findByEmail(orderData.user);

            console.log(user);

            if (!user)
            {
                return null;
            }

            const cartObjs = orderData.cart.map((order) =>
            {
                const cart = CartService.findById(orderData.cart);

                if (!cart)
                {
                    return null;
                }
            });

            if(cartObjs.length < 1)
            {
                return null;
            }
            // check cart
            // const cart = await CartService.findById(orderData.cart);

            // console.log(cart);

            const order = new Order({
                qty             : orderData.qty,
                shippingDetails : orderData.shippingDetails,
                total           : orderData.total,
                user            : orderData._id,
                cart            : cartObjs,
                isActive        : true,
            });

            console.log(order);

            // create order
            const data = await order.save();

            console.log(data);

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

        const data = await Order.deleteOne({ _id: ObjectId(id) });

        // console.log(data);

        return data;
    },
};

module.exports = OrderService;
