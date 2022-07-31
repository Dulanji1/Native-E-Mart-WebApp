const dbContext = require('./database/applicationDbContext');
const applicationDataSeeder = require('./database/applicationDataSeeder');
const userService = require('./user/user.service');
const exceptionService = require('./exception/exception.service');
const RoleService = require('./userRole/userRole.service');
const DeliveryService = require('./delivery/delivery.Service');
const CategoryService = require('./category/category.service');
const ItemService = require('./items/item.service');
const mailService = require('./system/mailer/nodeMailer.service');
const emailNotificationService = require('./system/notification/emailNotification.service');
const TokenService = require('./user/token.service');
const dataManagerService = require('./system/DataManager/dataManager.service');
const CartService = require('./cart/cart.service');
const OrderService = require('./order/order.service');

module.exports = {
    dbContext,
    applicationDataSeeder,
    userService,
    exceptionService,
    RoleService,
    DeliveryService,
    CategoryService,
    ItemService,
    mailService,
    emailNotificationService,
    TokenService,
    dataManagerService,
    CartService,
    OrderService,
};
