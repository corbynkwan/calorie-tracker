/*
    *Test Service
*/

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
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    filters: {
        type: Array,
        required: false
    }
};



const nearby = {}

nearby.getRestaurantsWithinDist = async(lat,lon,maxDist) => {

    return new Promise(async(resolve, reject) => {

        if(!lat||!lon||!maxDist){
            reject({code: 403, error:"require all of lat, lon, maxDistance"})
        }
        try {
            await db.connect();
            const allRestaurants = await db.restaurants.find({});
            resolve(allRestaurants);
        } catch (e) {
            reject({code: 406, error: e});
        }

    }).then((allRestaurants)=>{
        let list = [];
        for(let index in allRestaurants){
            let dist = CoolWPDistance(parseFloat(allRestaurants[index].lon),parseFloat(allRestaurants[index].lat),parseFloat(lon),parseFloat(lat));
            if(dist<maxDist){
                list.push(allRestaurants[index]);
            }
        }
        return{code:201, results:list};
    })
}

function getRad(d){
    var PI = Math.PI;
    return d*PI/180.0;
}

function CoolWPDistance(lng1,lat1,lng2,lat2){
    if(lng1===lng2&&lat1===lat2)return 0;
    var f = getRad((lat1 + lat2)/2);
    var g = getRad((lat1 - lat2)/2);
    var l = getRad((lng1 - lng2)/2);
    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);
    var s,c,w,r,d,h1,h2;
    var a = 6378137.0;//The Radius of eath in meter.
    var fl = 1/298.257;
    sg = sg*sg;
    sl = sl*sl;
    sf = sf*sf;
    s = sg*(1-sl) + (1-sf)*sl;
    c = (1-sg)*(1-sl) + sf*sl;
    w = Math.atan(Math.sqrt(s/c));
    r = Math.sqrt(s*c)/w;
    d = 2*w*a;
    h1 = (3*r -1)/2/c;
    h2 = (3*r +1)/2/s;
    s = d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
    // return in meters
    return s;
}

module.exports = nearby;