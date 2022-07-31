const User = require('./user/user');
const Role = require('./role/role');
const Delivery = require('./delivery/delivery');
const Category = require('./category/category');
const Cart = require('./cart/cart');
const Order = require('./order/order');
const Items = require('./items/item');
const Token = require('./user/tokens');

module.exports = {
    User,
    Role,
    Delivery,
    Category,
    Cart,
    Order,
    Items,
    Token,
};
