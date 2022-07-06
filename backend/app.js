/*
    *Entrypoint - Backend
*/

const express = require('express');
const db = require('./db/db.config');
const jwt = require('express-jwt').expressjwt;
const jwks = require('jwks-rsa');
const axios = require('axios');

require('dotenv').config();
const app = express();

// *Importing Services

const test = require('./services/test');
const user = require('./services/user');

// *Middleware

/* Allow CORS */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
});


/* JWT Verification */

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH_JWKSURI
  }),
  audience: process.env.AUTH_AUDIENCE,
  issuer: process.env.AUTH_ISSUER,
  algorithms: [process.env.AUTH_ALGO]
});
app.use(jwtCheck);

/* Attaching user details to incoming request object */

const userGateway = async(req, res, next) => {
    let methods = ['GET', 'POST', 'PUT', 'DELETE'];

    if (methods.includes(req.method)) {
        const token = req.headers.authorization.split(' ')[1];
        const resp = await axios.get(`${process.env.AUTH_ISSUER}userInfo`,
        {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }
        );

        const userDetails = resp.data;
        req.userDetails = userDetails;
    }
    
    next();
}
app.use(userGateway);

/* Parse any req body to JSON */
app.use(express.json());

// *Application Routes

/* Get FoodLog for existing user */
app.get('/User/FoodLogs/', async(req, res) => {
    try {
        const retrivedData = await user.foodLog.get(req.userDetails);
        res.statusCode = retrivedData.code;

        res.json(retrivedData);
    } catch (error) {
        res.statusCode = 500;
        res.json({});
    }

});

/* Add to FoodLog of currently LoggedIn user */
app.post('/User/FoodLog/', async(req, res) => {

    try {

        const retrivedData = await user.foodLog.add(req.userDetails, req.body.newRow);
        res.statusCode = retrivedData.code;
        res.json(retrivedData);

    } catch (error) {

        res.statusCode = 500;
        res.json({});
    }

});

/* Creates new entry from exisitng entry in FoodLog of LoggedIn user */
app.put('/User/FoodLog/', async(req, res) => {

    try {

        const retrivedData = await user.foodLog.modify(req.userDetails, req.body.updatedRow);
        res.statusCode = retrivedData.code;
        res.json(retrivedData);

    } catch (error) {

        res.statusCode = 500;
        res.json({});
    }

});

/* Deletes an exisitng entry in FoodLog of LoggedIn user */
app.delete('/User/FoodLog/:logId', async(req, res) => {

    try {
        const retrivedData = await user.foodLog.delete(req.userDetails, req.params.logId);
        res.statusCode = retrivedData.code;

        res.json(retrivedData);
    } catch (error) {
        res.statusCode = 500;
        res.json({});
    }

});

// *Initialize Server

const port = 5001 || process.env.port;
app.listen(port, async() => {
    
    try {
        console.log(`\x1b[36mStarting API...\x1b[0m`);

        console.log(`\x1b[33m→ Connecting to Database...\x1b[0m`)
        await db.connect();
        console.log(`\x1b[32m → Connected.\x1b[0m`)
        console.log(`\x1b[36mCalorie Tracker API listening on port ${port}\x1b[0m`)

    } catch (e) {
        console.log(`\x1b[31m → Connection Refused.\n Please see error below: \n \x1b[0m`)
        console.error(e)
        console.log(`Calorie Tracker API could not start.`)
    }

    
});