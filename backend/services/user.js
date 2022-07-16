/*
    *User Services
*/

const mongoose = require('mongoose');
const db = require('../db/db.config');
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

    return new Promise(async(resolve, reject) => {
        try {
            await user.prepareForTransaction(userDetails);
            const userRecord = await db.User.findOne(
                {email: userDetails.email}
            )
            resolve({code: 200, log: userRecord.foodLog});
    
        } catch (e) {

            reject({code: e.code || 406, error: e.error || 'DB Error'});

        }
    })
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