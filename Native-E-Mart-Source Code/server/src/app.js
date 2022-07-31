const Koa = require('koa');
const koaBody = require('koa-body');
const KoaStatic = require('koa-static');
const serve = require('koa-static');
const cors = require('@koa/cors');
const router = require('./api');
const { dbContext, exceptionService, applicationDataSeeder } = require('./services');

// init the database connection.
dbContext();

const app = new Koa();

app
    .use(koaBody())
    .use(cors())
    .use(exceptionService.errorHandler) // register generic error handler middleware
    .use(exceptionService.jsonErrorHandler) // register json error handler middleware
    .use(router()) // Use the Router on the sub routes+
    .use(KoaStatic('public')) // server statics
    .use(serve('client'))
    // Bootstrap the server
    .listen(process.env.PORT || 5000, () =>
    {
        console.log('server stared with port 5000');

        // application default data seeder
        applicationDataSeeder.seedRoles()
            .then((r) => console.info('role data seeder executed'));
        applicationDataSeeder.seedUsers()
            .then((r) => console.info('user data seeder executed'));

        console.log();
        console.log();
        console.log('=======================Application StartUp===========================');
        console.log('\x1b[33m\x1b[4m%s\x1b[0m', 'http://localhost:5000/');
        console.log('=====================================================================');
        console.log();
    });
