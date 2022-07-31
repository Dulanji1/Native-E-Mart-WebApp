const combineRouters = require('koa-combine-routers');
// auth routes
const authRouter = require('./auth/authRouter');
const categoryRouter = require('./category/categoryRouter');
const userRouter = require('./user/userRouter');
const itemRouter = require('./items/itemRouter');
const DeliveryRouter = require('./delivery/deliveryRouter');
const cartRouter = require('./cart/cartRouter');
const OrderRouter = require('./order/orderRouter');

const router = combineRouters(
    authRouter,
    categoryRouter,
    userRouter,
    itemRouter,
    DeliveryRouter,
    cartRouter,
    OrderRouter,
);

module.exports = router;
