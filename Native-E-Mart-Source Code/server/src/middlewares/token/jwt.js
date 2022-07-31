const koaJwt = require('koa-jwt');
const { jwtSecret, tokenExpireTime } = require('../../config');

module.exports = koaJwt({
    secret : jwtSecret, // Should not be hardcoded
    exp    : tokenExpireTime,
});
