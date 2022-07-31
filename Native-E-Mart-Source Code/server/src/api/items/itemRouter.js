const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { ItemType, Response } = require('../../types');
const { ItemService } = require('../../services');
const { koaJwt } = require('../../middlewares');

// Prefix all routes with: /item
const router = new Router({
    prefix : '/api/item',
});

// Routes will go here

// item create method
router.post('/create', koaJwt, async (ctx, next) =>
{
    const request = Object.setPrototypeOf(ctx.request.body, ItemType.prototype);
    // Check if any of the data field not empty

    console.log(request.isValid());

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

    const result = await ItemService.create(request);

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
    response.message = `Item created successfully.`;
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

    const result = await ItemService.findAll();

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

    const result = await ItemService.findById(params._id);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot list item";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Item listed successfully.`;
    response.data = {
        category : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

router.delete('/deleteById/:_id', koaJwt, async (ctx, next) =>

{
    const { params } = ctx;

    console.log(params._id);

    const response = new Response();

    const result = await ItemService.deleteById(params._id);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot delete category";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Category deleted successfully.`;
    response.data = {
        category : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

router.put('/update', koaJwt, async (ctx, next) =>
{
    const params = ctx.request.body;

    console.log(params);

    const response = new Response();

    const result = await ItemService.update(params);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot update item";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Item updated successfully.`;
    response.data = {
        category : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

module.exports = router;
