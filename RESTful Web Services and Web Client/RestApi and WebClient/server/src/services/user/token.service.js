const generator = require('generate-password');
const dataManagerService = require('../system/DataManager/dataManager.service');
const { Token } = require('../../models');

const TokenService = {
    generateNewToken : async (email) =>
    {
        const getToken = dataManagerService.generateUniqueToken();

        const tokenObj = new Token();

        tokenObj.token = getToken;
        tokenObj.createDate = new Date();
        tokenObj.isActive = true;
        tokenObj.email = email;

        tokenObj.save((err) =>
        {
            // TODO : send error log
            console.error(err);
        });

        return tokenObj;
    },
    isTokenValid : async (email, token) =>
    {
        const data = await Token.findOne({ email, token, isActive: true });

        if (!data) return false;

        return true;
    },
    generateRandomPassword : async () => generator.generate({
        length  : 15,
        numbers : true,
        symbols : true,
    }),
};

module.exports = TokenService;
