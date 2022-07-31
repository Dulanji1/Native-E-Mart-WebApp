const mongoose = require('mongoose');
const { connectionString } = require('../../config');

const dbContext = () =>
{
    mongoose.connect(connectionString,
        {
            useNewUrlParser    : true,
            useFindAndModify   : false,
            useUnifiedTopology : true,
            server             : { socketOptions: { connectTimeoutMS: 10000 } },
        })
        . then(() => { console.log('connection established'); });

    mongoose.connection.once('open', () =>
    {
        console.log('connected to database');
    });

    mongoose.connection.on('mongo connection error', console.error);
};

module.exports = dbContext;
