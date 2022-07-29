const db = require('../db/db.config');
const mongoose = require("mongoose");
let ObjectId = require('mongoose').Types.ObjectId;
const crawler = require('../crawler/crawler');

const restaurantSchema = {
    _id: ObjectId,
    name: {
        type: String,
        required: true
    },
    restaurant_id:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lon: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    menu_ids: {
        type: Object,
        of: String,
        required: true
    },
    filters: {
        type: Array,
        required: false
    }

};

db.restaurants=mongoose.model('restaurants',restaurantSchema);
const eatery = {}

eatery.getByID = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.connect();
            const foundEatery = await db.restaurants.findOne({restaurant_id:id});
            resolve({code: 201, result: foundEatery});
        } catch (e) {
            reject({code: 406, error: e});
        }
    })
}

eatery.getAll = async() => {
    return new Promise(async(resolve,reject) => {
        try{
            await db.connect();
            const res = await db.restaurants.find({});
            resolve({code: 200, results: res});
        }catch (e) {
            reject({code: 406, error: e});
        }
    })
}

eatery.getAllByOpen = async(isOpen) => {
    return new Promise(async(resolve,reject) => {
        try{
            await db.connect();
            const allRestaurants = await db.restaurants.find({});
            let ret = [];
            if(isOpen==="true"){
                for (let i in allRestaurants){
                    if(checkAuditTime(allRestaurants[i].startTime,allRestaurants[i].endTime)){
                        ret.push(allRestaurants[i]);
                    }
                }
            }else{
                for (let i in allRestaurants){
                    if(!checkAuditTime(allRestaurants[i].startTime,allRestaurants[i].endTime)){
                        ret.push(allRestaurants[i]);
                    }
                }
            }
            resolve({code: 200, results: ret});
        }catch (e) {
            reject({code: 406, error: e});
        }
    })
}

eatery.getByFilters = async(rawFilters) => {
    return new Promise(async(resolve,reject) => {
        try{
            let filters = rawFilters.split(",");
            await db.connect();
            const foundRestaurants = await db.restaurants.find({filters:{$all:filters}});
            resolve({code: 200, results: foundRestaurants});
        } catch (e) {
            reject({code: 406, error: e});
        }
    })
}

eatery.getByOpenAndFilters = async(isOpen, rawFilters) => {
    return new Promise(async(resolve,reject) => {
        try{
            let filters = rawFilters.split(",");
            await db.connect();
            const foundRestaurants = await db.restaurants.find({filters:{$all:filters}});
            let ret = {};
            if(isOpen === "true"){
                for (let i in foundRestaurants){
                    if(checkAuditTime(foundRestaurants[i].startTime,foundRestaurants[i].endTime)){
                        ret.push(foundRestaurants[i]);
                    }
                }
            }else{
                for (let i in foundRestaurants){
                    if(!checkAuditTime(foundRestaurants[i].startTime,foundRestaurants[i].endTime)){
                        ret.push(foundRestaurants[i]);
                    }
                }
            }
            resolve({code: 200, results: ret});
        } catch (e) {
            reject({code: 406, error: e});
        }
    })
}

eatery.updateRestaurants = async() => {
        let eateries = await crawler.restaurants();
        for(let i in eateries){
            let menuIds = [];
            let menuObj ={}
            for(let menuId in eateries[i].menus){
                menuObj[menuId.toString()] = eateries[i].menus[menuId];
            }
             await db.connect();
             await db.restaurants.findOneAndUpdate({restaurant_id:eateries[i].id},{
                name:eateries[i].name,
                geolocation:eateries[i].geolocation,
                address:eateries[i].address,
                logo:eateries[i].logo,
                startTime:eateries[i].startTime.substring(0,5),
                endTime:eateries[i].endTime.substring(0,5),
                 menu_ids: menuObj
            },{upsert:true});
            return eateries;
        }
}


function checkAuditTime(beginTime, endTime) {
    var nowDate = new Date();
    var beginDate = new Date(nowDate);
    var endDate = new Date(nowDate);

    var beginIndex = beginTime.lastIndexOf("\:");
    var beginHour = beginTime.substring(0, beginIndex);
    var beginMin = beginTime.substring(beginIndex + 1, beginTime.length);
    beginDate.setHours(beginHour, beginMin, 0, 0);

    var endIndex = endTime.lastIndexOf("\:");
    var endHour = endTime.substring(0, endIndex);
    var endMin = endTime.substring(endIndex + 1, endTime.length);
    endDate.setHours(endHour, endMin, 0, 0);
    return nowDate.getTime() - beginDate.getTime() >= 0 && nowDate.getTime() <= endDate.getTime();
}

module.exports = eatery;