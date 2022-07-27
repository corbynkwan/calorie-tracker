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

const mongoose = require("mongoose");
// Importing Services

const eatery = require("./services/eatery");
const nearby = require("./services/nearby");
const item = require("./services/item");
const test = require('./services/test');
const user = require('./services/user');
const crawler = require('./crawler/crawler');


testCrawlerFunction();

async function testCrawlerFunction(){
    let restaurantsData = await eatery.updateRestaurants();
    item.updateAllItems(restaurantsData);
}


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

// query parameter:
// empty
// id
// isOpen(TF)
// filters(every filter is split by , )
// isOpen + filters
app.get('/eatery',async (req, res) => {
    if (req.query.id === undefined && req.query.isOpen === undefined && req.query.filters === undefined) {
        let retrievedData = await eatery.getAll();
        res.statusCode=retrievedData.code;
        res.json(retrievedData);
    }else if(req.query.id !== undefined && req.query.isOpen === undefined && req.query.filters === undefined){
        let retrievedData = await eatery.getByID(req.query.id);
        res.statusCode=retrievedData.code;
        res.json(retrievedData);
    }else if(req.query.id === undefined && req.query.isOpen !== undefined && req.query.filters === undefined){
        let retrievedData = await eatery.getAllByOpen(req.query.isOpen);
        res.statusCode=retrievedData.code;
        res.json(retrievedData);
    }else if(req.query.id === undefined && req.query.isOpen === undefined && req.query.filters !== undefined){
        let retrievedData = await eatery.getByFilters(req.query.filters);
        res.statusCode=retrievedData.code;
        res.json(retrievedData);
    }else if(req.query.id === undefined && req.query.isOpen !== undefined && req.query.filters !== undefined){
        let retrievedData = await eatery.getByOpenAndFilters(req.query.isOpen, req.query.filters);
        res.statusCode=retrievedData.code;
        res.json(retrievedData);
    }
})

// query parameter:
// empty
// id
// eateryId
// filters(every filter is split by , )
// eateryId+filters
app.get('/items',async (req, res) => {
    if (req.query.eateryId === undefined && req.query.id === undefined && req.query.filters === undefined) {
        let retrievedData = await item.getAll();
        res.statusCode=retrievedData.code;
        res.json(retrievedData);
    }else if(req.query.id!==undefined && req.query.eateryId===undefined && req.query.filters === undefined){
        let retrievedData = await item.getByID(req.query.id);
        res.statusCode=retrievedData.code;
        res.json(retrievedData);
    }else if(req.query.id===undefined && req.query.eateryId !== undefined && req.query.filters === undefined){
        let retrievedData = await item.getByEateryId(req.query.eateryId);
        res.statusCode=retrievedData.code;
        res.json(retrievedData);
    }else if(req.query.id === undefined && req.query.eateryId === undefined && req.query.filters !== undefined){
        let retrievedData = await item.getByFilters(req.query.filters);
        res.statusCode=retrievedData.code;
        res.json(retrievedData);
    }else if(req.query.id === undefined && req.query.eateryId !== undefined && req.query.filters !== undefined){
        let retrievedData = await item.getByEateryIdAndFilters(req.query.eateryId, req.query.filters);
        res.statusCode=retrievedData.code;
        res.json(retrievedData);
    }

})

app.get('/nearby/',async (req,res)=>{
    let retrievedData = await nearby.getRestaurantsWithinDist(req.query.lat,req.query.lon,req.query.maxDist);
    res.statusCode=retrievedData.code;
    res.json(retrievedData);
})

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

app.post('/test/Update',async()=>{
    try{
        let restaurantsData = crawler.restaurants();
        await eatery.updateRestaurants(restaurantsData);
    }catch (e) {
        
    }
})

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