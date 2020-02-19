const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const redis = require('async-redis');
const authentication = require("./middleware/authentication");
const authorization = require("./middleware/authorization");

require('dotenv').config();

module.exports = async (app) => {
    app.disable('x-powered-by');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(compression());
    app.use(helmet());
    app.use(authentication);
    app.use(authorization);
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,content-type,token");
        if ('OPTIONS' == req.method) {
            res.sendStatus(200);
        } else {
            next();
        }
    });
    const port = process.env.PORT;
    const env = process.env.NODE_ENV;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED=0;

    // mongoose
    // .connect('mongodb://admin:Zicard_PremioZ@200.219.199.240:27017/CatalogoPremios?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true })
    // .catch(error => console.error('Aqui:', error));

    // const db = require('../db');
    // const config = require('./knexfile')[env];
    // let db = null;
    // if (!db) {
    //     db = {};
    //     db = knex(config);
    //     app.db = db;
    // }
    
    app.cache = redis.createClient(process.env.REDIS);
    app.use(express.static("public"))
    app.listen(port);
    console.log('API running on port: ' + port);
}