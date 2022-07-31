const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { CartType, Response } = require('../../types');
const { CartService } = require('../../services');

// Prefix all routes with: /item
const router = new Router({
    prefix : '/api/cart',
});

// Routes will go here

// cart create method
router.post('/create', async (ctx, next) =>
{
    const para = ctx.request.body;
    const request = Object.setPrototypeOf(ctx.request.body, CartType.prototype);
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

    const result = await CartService.create(request);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot create item";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Cart created successfully.`;
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

    const result = await CartService.findAll();

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot get cart";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Cart retrived successfully.`;
    response.data = {
        cart : result,
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

    const result = await CartService.findById(params._id);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot list cart";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Cart listed successfully.`;
    response.data = {
        category : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

router.delete('/deleteById/:_id', async (ctx, next) =>

{
    const { params } = ctx;

    console.log(params._id);

    const response = new Response();

    const result = await CartService.deleteById(params._id);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot delete cart";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Cart deleted successfully.`;
    response.data = {
        cart : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

router.put('/update', async (ctx, next) =>
{
    const params = ctx.request.body;

    console.log(params);

    const response = new Response();

    const result = await CartService.update(params);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot update cart";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `cart updated successfully.`;
    response.data = {
        cart : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

module.exports = router;
