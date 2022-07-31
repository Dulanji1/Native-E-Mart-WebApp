const koaJwt = require('./token/jwt');
const authenticate = require('./authentication/authenticate');

module.exports = {
    koaJwt,
    authenticate,
};
