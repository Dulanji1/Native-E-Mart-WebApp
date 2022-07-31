const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { CategoryType, Response } = require('../../types');
const { CategoryService } = require('../../services');
const { koaJwt } = require('../../middlewares');

// Prefix all routes with: /category
const router = new Router({
    prefix : '/api/category',
});

// Routes will go here

// category create method
router.post('/create', koaJwt, async (ctx, next) =>
{
    const params = ctx.request.body;

    console.log(params);

    const request = Object.setPrototypeOf(ctx.request.body, CategoryType.prototype);
    // Check if any of the data field not empty

    console.log(request);

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

    const result = await CategoryService.create(request);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot create category";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();
    }
    else if (result === true)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Category already exists";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();
    }
    else
    {
        response.success = true;
        response.message = `Category created successfully.`;
        response.data = {
            category : result,
        };
        ctx.response.status = StatusCodes.OK;
        ctx.body = response;
        next().then();
    }
});

router.get('/getAll', async (ctx, next) =>
{
    const response = new Response();

    const result = await CategoryService.findAll();

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot get categories";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Categories retrived successfully.`;
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

    const result = await CategoryService.findById(params._id);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot list category";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Category listed successfully.`;
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

    const result = await CategoryService.deleteById(params._id);

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

    const result = await CategoryService.update(params);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot update category";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Category updated successfully.`;
    response.data = {
        category : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

module.exports = router;
