const crawler = require('./crawler');
const schedule = require('node-schedule');
const eatery = require("../services/eatery");
const item = require("../services/item");

crawlerStart();
setInterval(crawlerStart,1000*60*60*24);


async function crawlerStart(){
    let restaurantsData = await eatery.updateRestaurants();
    await item.updateAllItems(restaurantsData);
    console.log('complete once!!');
}
