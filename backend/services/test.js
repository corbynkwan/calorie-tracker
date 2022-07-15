/*
    *Test Service
*/

const db = require('../db/db.config');
const test = {}

test.add = async(obj) => {

    return new Promise(async(resolve, reject) => {

        try {
        
            const testObj = await db.Test.create(obj);
            resolve({code: 201, created: testObj});
    
        } catch (e) {

            reject({code: 406, error: e});

        }
    })
}

test.getAll = async() => {

    return new Promise(async(resolve) => {

        const res = await db.Test.find({});
        resolve({code: 200, results: res});

    })
}

module.exports = test;