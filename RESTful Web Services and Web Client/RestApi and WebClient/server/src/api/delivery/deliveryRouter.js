const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { DeliveryType, Response } = require('../../types');
const { DeliveryService } = require('../../services');
const { koaJwt } = require('../../middlewares');

// Prefix all routes with: /item
const router = new Router({
    prefix : '/api/delivery',
});

// Routes will go here

// delivery create method
router.post('/create', koaJwt, async (ctx, next) =>
{
    const request = Object.setPrototypeOf(ctx.request.body, DeliveryType.prototype);
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

    const result = await DeliveryService.create(request);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot create.Data is already exists.";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Data created successfully.`;
    response.data = {
        deliver : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

router.get('/getAll', async (ctx, next) =>
{
    const response = new Response();

    const result = await DeliveryService.findAll();

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot get delivery data";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Deliver Details retrieved successfully.`;
    response.data = {
        deliver : result,
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

    const result = await DeliveryService.findById(params._id);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot list delivers";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Deliver details listed successfully.`;
    response.data = {
        deliver : result,
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

    const result = await DeliveryService.deleteById(params._id);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot delete deliver details";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Deliver details deleted successfully.`;
    response.data = {
        deliver : result,
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

    const result = await DeliveryService.update(params);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot update delivery details";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Delivery details updated successfully.`;
    response.data = {
        category : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});
module.exports = router;
