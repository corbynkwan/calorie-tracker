/*
    *User Services
*/

const mongoose = require('mongoose');
const db = require('../db/db.config');
const eatery = require('./eatery');
const nearby = require('./nearby');
const item = require('./item');
const user = {};


user.prepareForTransaction = async(userDetails) => {

    return new Promise(async(resolve, reject) => {
        try {
            
            if (!(await db.User.exists({email: userDetails.email}))) {

                let newUser = {
                    email: userDetails.email,
                    name: userDetails.name
                }

                await db.User.create(newUser);
            }

            resolve();
    
        } catch (e) {

            reject({code: 500, error: e});

        }
    })
}

user.foodLog = {};

user.foodLog.add = async(userDetails, logItem) => {

    return new Promise(async(resolve, reject) => {

        try {
            
            await user.prepareForTransaction(userDetails);
            logItem.id  = new mongoose.Types.ObjectId().toString();
            await db.User.updateOne(
                {email: userDetails.email},
                { $push: {foodLog: logItem} }
            )
            resolve({code: 201, log: logItem});
    
        } catch (e) {

            reject({code: e.code || 406, error: e.error || 'DB Error'});

        }
    })
}

user.foodLog.get = async(userDetails) => {
    // Retrieve current date's food log when user Logged in 
    const date = new Date();
    return new Promise(async(resolve, reject) => {
    try {
        await user.prepareForTransaction(userDetails);
        const userRecord = await db.User.aggregate([ 
            { $match: {email: userDetails.email}},
            { $project: {
                foodLog: {$filter: {
                    input: '$foodLog',
                    as: 'log',
                   cond: {
                    $regexMatch: {
                      input: "$$log.dateTime",
                      // Only match the date part e.g. "2022-07-23" 
                      regex: date.toISOString().substring(0,10)
                    }
                  }
                }}
            }}
        ])

        resolve({code: 200, log: userRecord[0].foodLog});

    } catch (e) {

        reject({code: e.code || 406, error: e.error || 'DB Error'});

}
    })
}

user.foodLog.getByDate = async(userDetails, dateTime) => {
    return new Promise(async(resolve, reject) => {
    try {
        await user.prepareForTransaction(userDetails);
        const userRecord = await db.User.aggregate([ 
            { $match: {email: userDetails.email}},
            { $project: {
                foodLog: {$filter: {
                    input: '$foodLog',
                    as: 'log',
                   cond: {
                    $regexMatch: {
                      input: "$$log.dateTime",
                      // Only match the date part e.g. "2022-07-23" 
                      regex: dateTime
                    }
                  }
                }}
            }}
        ])

        resolve({code: 200, log: userRecord[0].foodLog});

    } catch (e) {

        reject({code: e.code || 406, error: e.error || 'DB Error'});

}
    })
}

user.calorie = {};

user.calorie.get = async(userDetails)=>{
    return new Promise(async(resolve, reject) => {
        try {
            await db.connect();
            const retrivedData= await db.User.findOne({email:userDetails.email});
            resolve({code: 201, result:retrivedData._doc.dailyCalorie});
        } catch (e) {
            reject({code: 406, error: e});
        }
    })
}

user.recommendation = async(userDetails,lat,lon,dateTime)=>{
    const recommendNum = 5;
    try {
        let openingRestaurant = await eatery.getAllByOpen(true);
        openingRestaurant = openingRestaurant.results;
        const remainingCalorie = await user.calorie.getRemaining(userDetails, dateTime);
        let distanceArr = []
        for (let i in openingRestaurant) {
            items = await item.getByEateryId(openingRestaurant[i].restaurant_id);
            if(openingRestaurant[i].geolocation){
                let distance = nearby.calculateDistance(parseFloat(lon), parseFloat(lat), openingRestaurant[i].geolocation.longitude, openingRestaurant[i].geolocation.latitude);
                distanceArr.push({restaurant:openingRestaurant[i],distance:distance});
            }
        }
        distanceArr.sort(function (a,b) {
            return a.distance-b.distance;
        });
        const recommendedRestaurant = distanceArr.map(e=>e.restaurant);
        let res = [];
        for(let i = 0; i < recommendNum; i++){
            let recommendItems = await item.getByEateryId(recommendedRestaurant[i].restaurant_id);
            recommendItems=recommendItems.result;
            if(recommendItems.length!=0){
                // recommended item's calorie should not exceed the everyday calorie limit.
                recommendItems.filter(e=>{e.calories<=remainingCalorie||!e.calories});
                const recommendItem = recommendItems[Math.floor(Math.random() * recommendItems.length)];
                res.push(recommendItem);
            }
        }
        return {code: 201,result:res};
    }
    catch (e) {
        return {code: 406, error: e};
    }
}

user.calorie.getRemaining = async(userDetails,dateTime)=>{
    try{
        const maxCalData = await user.calorie.get(userDetails);
        const maxCal = maxCalData.result;
        const oneDayFoodLogData = await user.foodLog.getByDate(userDetails, dateTime);

        let calCount = 0;
        const foodLogs = oneDayFoodLogData.log;
        for(let i in foodLogs){
            calCount += parseFloat(foodLogs[i].calories);
        }
        return {code:201,result:calCount};
    }
    catch (e) {
        reject({code: 406, error: e});
    }

}

user.foodLog.delete = async(userDetails, logId) => {

    return new Promise(async(resolve, reject) => {
        try {

            await user.prepareForTransaction(userDetails);

            const userRecord = await db.User.updateOne({ email: userDetails.email }, 
                { "$pull": { "foodLog": { "id": logId } }}, 
                { safe: true, multi:false });

            resolve({code: 200, log: userRecord.foodLog});
    
        } catch (e) {

            reject({code: e.code || 406, error: e.error || 'DB Error'});

        }
    })
}

user.foodLog.modify = async(userDetails, log) => {

    return new Promise(async(resolve, reject) => {
        try {

            await user.prepareForTransaction(userDetails);
            await db.User.updateOne({ email: userDetails.email }, 
                { "$pull": { "foodLog": { "id": log.id } }}, 
                { safe: true, multi:false });
            
            const oldId = log.id;
            log.id  = new mongoose.Types.ObjectId().toString();

            await db.User.updateOne(
                    {email: userDetails.email},
                    { $push: {foodLog: log} }
                )
            
            log.oldId = oldId;
            resolve({code: 200, log: log});
    
        } catch (e) {

            reject({code: e.code || 406, error: e.error || 'DB Error'});

        }
    })
}


module.exports = user;