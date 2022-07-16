/*
    Entrypoint - Backend
*/

const express = require('express');
const db = require('./db/db.config');

const app = express();
const mongoose = require("mongoose");
// Importing Services

const test = require('./services/test');
const eatery = require("./services/eatery");
const nearby = require("./services/nearby");
const item = require("./services/item");

// Middleware

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
});


app.get('/test', async(req, res) => {

    const retrievedData = await test.getAll();
    res.statusCode = retrievedData.code;

    res.json(retrievedData);

})

app.get('/User', async(req, res) => {

    const retrievedData = await test.getAll();
    res.statusCode = retrievedData.code;

    res.json(retrievedData);

})

app.get('/UserLog/:uid', async(req, res) => {

    const retrievedData = await test.getAll();
    res.statusCode = retrievedData.code;

    res.json(retrievedData);

})

app.post('/UserLog/:uid', async(req, res) => {

    const retrievedData = await test.getAll();
    res.statusCode = retrievedData.code;

    res.json(retrievedData);

})

app.put('/UserLog/:uid/lid', async(req, res) => {

    const retrievedData = await test.getAll();
    res.statusCode = retrievedData.code;

    res.json(retrievedData);

})

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



app.post('/test', async(req, res) => {
    
    const response = await test.add(req.body);
    res.statusCode = response.code;
    res.json(response);

})

const port = 6000 || process.env.port;
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

    
})