const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes');
const { jwtSecret, tokenExpireTime } = require('../../config');
const { userService, dataManagerService } = require('../../services');
const { Response } = require('../../types');

const authenticate = async (ctx, data) =>
{
    const response = new Response();

    try
    {
        const user = await userService.findByEmail(data.email);

        if (user)
        {
            // check email confirmed
            if (!user.emailConfirmed)
            {
                ctx.status = StatusCodes.UNAUTHORIZED;

                // set response
                response.success = false;
                response.message = `Your account not has been confirmed.Please verify your account.`;
                response.data = {
                    token : null,
                    user  : null,
                };
                ctx.body = response;

                return;
            }

            // check password
            const authenticated = await dataManagerService
                .checkPassword(data.password, user.password);

            // check user is authenticated or not
            if (!authenticated)
            {
                ctx.status = StatusCodes.UNAUTHORIZED;

                // set response
                response.success = false;
                response.message = `There was an error with your e-mail/password combination. Please try again.`;
                response.data = {
                    token : null,
                    user  : null,
                };

                ctx.body = response;

                return;
            }

            ctx.status = StatusCodes.OK;

            const token = await jwt.sign(user.toJSON(), jwtSecret, {
                expiresIn : tokenExpireTime,
            });

            // remove password field
            user.password = undefined;

            // set response
            response.success = true;
            response.message = `Successfully singed in as ${user.name}.`;
            response.data = {
                token,
                user,
            };
        }
        else
        {
            ctx.status = StatusCodes.UNAUTHORIZED;

            // set response
            response.success = false;
            response.message = `There was an error with your e-mail/password combination. Please try again.`;
            response.data = {
                token : null,
                user  : null,
            };
        }
    }
    catch (error)
    {
        console.log(error);

        ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;

        // set response
        response.success = false;
        response.message = `Sorry, there were some technical issues while processing your request.`;
        response.data = {
            message : error.message,
            error,
        };
    }

    ctx.body = response;
};

module.exports = authenticate;
