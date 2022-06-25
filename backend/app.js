/*
    Entrypoint - Backend
*/

const express = require('express');
const db = require('./db/db.config');

const app = express();

// Importing Services

const test = require('./services/test');

// Middleware

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
});


app.get('/test', async(req, res) => {

    const retrivedData = await test.getAll();
    res.statusCode = retrivedData.code;

    res.json(retrivedData);

})

app.get('/User', async(req, res) => {

    const retrivedData = await test.getAll();
    res.statusCode = retrivedData.code;

    res.json(retrivedData);

})

app.get('/UserLog/:uid', async(req, res) => {

    const retrivedData = await test.getAll();
    res.statusCode = retrivedData.code;

    res.json(retrivedData);

})

app.post('/UserLog/:uid', async(req, res) => {

    const retrivedData = await test.getAll();
    res.statusCode = retrivedData.code;

    res.json(retrivedData);

})

app.put('/UserLog/:uid/lid', async(req, res) => {

    const retrivedData = await test.getAll();
    res.statusCode = retrivedData.code;

    res.json(retrivedData);

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