const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { OrderType, Response } = require('../../types');
const { OrderService } = require('../../services');

// Prefix all routes with: /item
const router = new Router({
    prefix : '/api/order',
});

// Routes will go here

// order create method
router.post('/create', async (ctx, next) =>
{
    const para = ctx.request.body;
    const request = Object.setPrototypeOf(ctx.request.body, OrderType.prototype);
    // Check if any of the data field not empty

    console.log(para);

    const response = new Response();

    if (!request.isValid())
    {
        ctx.response.status = StatusCodes.BAD_REQUEST;
        response.success = false;
        response.message = "required field(s) missing";
        response.data = {
            message : "required field(s) missing",
        };
        next().then();

        return;
    }

    const result = await OrderService.create(request);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot create order";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `order created successfully.`;
    response.data = {
        item : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

router.get('/getAll', async (ctx, next) =>
{
    const response = new Response();

    const result = await OrderService.findAll();

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot get items";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Items retrived successfully.`;
    response.data = {
        category : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

router.get('/getById/:_id', async (ctx, next) =>
{
    const { params } = ctx;

    console.log(params._id);

    const response = new Response();

    const result = await OrderService.findById(params._id);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot list order";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `order listed successfully.`;
    response.data = {
        category : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

module.exports = router;
