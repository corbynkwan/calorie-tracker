const db = require('../db/db.config');
const mongoose = require("mongoose");
let ObjectId = require('mongoose').Types.ObjectId;

const restaurantSchema = {
    _id: ObjectId,
    name: {
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
            let query = { _id: new ObjectId(id)};
            const foundEatery = await db.restaurants.findOne(query);
            resolve({code: 201, result: foundEatery});
        } catch (e) {
            reject({code: 406, error: e});
        }
    })
}

eatery.getAll = async() => {

    return new Promise(async(resolve,reject) => {
        try{
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