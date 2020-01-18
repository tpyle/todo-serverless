const express = require('express');
const BodyParser = require('body-parser');
const router = require('./api');
const cors = require('cors');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const app = express();

app.use(cors({
    origin: 'http://todo.thomaspyle.com'
}));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

app.use('/', router);

module.exports = app;
