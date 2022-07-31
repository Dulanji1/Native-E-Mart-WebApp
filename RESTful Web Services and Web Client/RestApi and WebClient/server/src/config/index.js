const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    connectionString       : process.env.MONGO_CONNECTION,
    jwtSecret              : process.env.JWT_SECRET,
    tokenExpireTime        : process.env.JWT_TOKEN_EXPIRE || 86400,
    mailSenderIdentity     : process.env.MAIL_SENDER_IDENTITY,
    mailSenderPassword     : process.env.MAIL_SENDER_PASSWORD,
    siteLogo               : process.env.SITE_LOGO,
    accountConfirmationURL : process.env.ACCOUNT_CONFIRMATION_URL,
    siteName               : process.env.SITE_NAME,
    siteUrl                : process.env.SITE_URL,
};
