/*
    Database Setup
*/

require('dotenv').config();
const mongoose = require("mongoose");

const db = {};  

// Establish new connection with MongoDB Instance

db.connect = async() => {

    return new Promise(async(resolve, reject) => {

        try {

            await mongoose.connect(process.env.MONGODB_SRV);
            resolve();


        } catch (e) {

            console.error(e);
            reject();
        }

    });
}


// Schemas & Models

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    testedAt: {
        type: Date,
        default: () => Date.now()
    },
    reason: {
        type: String,
        required: false
    }
});

db.Test = mongoose.model("Test", testSchema);

/*
    TODO: Add Schemas & Models for all data types here.
*/

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    foodLog: {
        type: Array,
        required: false
    }
});

db.User = mongoose.model("User", userSchema);

// Export

module.exports = db;