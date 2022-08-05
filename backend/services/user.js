/*
 *User Services
 */

const mongoose = require("mongoose");
const db = require("../db/db.config");
const user = {};

user.prepareForTransaction = async (userDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!(await db.User.exists({ email: userDetails.email }))) {
        let newUser = {
          email: userDetails.email,
          name: userDetails.name,
        };

        await db.User.create(newUser);
      }

      resolve();
    } catch (e) {
      reject({ code: 500, error: e });
    }
  });
};

user.foodLog = {};

user.foodLog.add = async (userDetails, logItem) => {
  return new Promise(async (resolve, reject) => {
    try {
      await user.prepareForTransaction(userDetails);
      logItem.id = new mongoose.Types.ObjectId().toString();
      await db.User.updateOne(
        { email: userDetails.email },
        { $push: { foodLog: logItem } }
      );
      resolve({ code: 201, log: logItem });
    } catch (e) {
      reject({ code: e.code || 406, error: e.error || "DB Error" });
    }
  });
};

user.foodLog.get = async (userDetails) => {
  // Retrieve today's date's food log when user Logged in
  const dateTime = new Date().toISOString();
  let datesInfo = {};
  datesInfo = getDatesTimezoneInfo(dateTime);
  return new Promise(async (resolve, reject) => {
    try {
      await user.prepareForTransaction(userDetails);
      const userRecord = await db.User.aggregate([
        { $match: { email: userDetails.email } },
        {
          $project: {
            foodLog: {
              $filter: {
                input: "$foodLog",
                as: "log",
                cond: {
                  $and: [
                    { $gte: ["$$log.dateTime", datesInfo.dateTimeStart] },
                    { $lte: ["$$log.dateTime", datesInfo.dateTimeEnd] },
                  ],
                },
              },
            },
          },
        },
      ]);

      resolve({ code: 200, log: userRecord[0].foodLog });
    } catch (e) {
      reject({ code: e.code || 406, error: e.error || "DB Error" });
    }
  });
};

user.foodLog.getByDate = async (userDetails, dateTime) => {
  let datesInfo = {};
  datesInfo = getDatesTimezoneInfo(dateTime);
  return new Promise(async (resolve, reject) => {
    try {
      await user.prepareForTransaction(userDetails);
      const userRecord = await db.User.aggregate([
        { $match: { email: userDetails.email } },
        {
          $project: {
            foodLog: {
              $filter: {
                input: "$foodLog",
                as: "log",
                cond: {
                  $and: [
                    { $gte: ["$$log.dateTime", datesInfo.dateTimeStart] },
                    { $lte: ["$$log.dateTime", datesInfo.dateTimeEnd] },
                  ],
                },
              },
            },
          },
        },
      ]);

      resolve({ code: 200, log: userRecord[0].foodLog });
    } catch (e) {
      reject({ code: e.code || 406, error: e.error || "DB Error" });
    }
  });
};

user.foodLog.getReportPeriod = async (userDetails, period) => {
  const dateTime = new Date().toISOString();
  // PDT= UTC-7 PST= UTC-8
  const tzoffsetHour = new Date().getTimezoneOffset() / 60;
  let datesInfo = {};
  datesInfo = getDatesTimezoneInfo(dateTime, period);
  return new Promise(async (resolve, reject) => {
    try {
      await user.prepareForTransaction(userDetails);
      const report = await db.User.aggregate([
        { $match: { email: userDetails.email } },
        {
          $project: {
            foodLog: {
              $filter: {
                input: "$foodLog",
                as: "log",
                cond: {
                  $and: [
                    { $gte: ["$$log.dateTime", datesInfo.dateTimeStart] },
                    { $lte: ["$$log.dateTime", datesInfo.dateTimeEnd] },
                  ],
                },
              },
            },
          },
        },
        { $unwind: "$foodLog" },
        {
          $group: {
            _id: {
              $dateToString: {
                date: { $dateFromString: { dateString: "$foodLog.dateTime" } },
                format: "%Y-%m-%d",
                timezone: "Canada/Pacific",
              },
            },
            calories: {
              $sum: {
                $convert: {
                  input: "$foodLog.calories",
                  to: "double",
                },
              },
            },
            fat: {
              $sum: {
                $convert: {
                  input: "$foodLog.fat",
                  to: "double",
                },
              },
            },
            carbs: {
              $sum: {
                $convert: {
                  input: "$foodLog.carbs",
                  to: "double",
                },
              },
            },
            protein: {
              $sum: {
                $convert: {
                  input: "$foodLog.protein",
                  to: "double",
                },
              },
            },
          },
        },
        {$set: {date: "$_id"}},
        {$unset: "_id"},
        { $sort: { date: 1 } },
      ]);
      resolve({ code: 200, logsReport: report});
    } catch (e) {
      reject({ code: e.code || 406, error: e.error || "DB Error" });
    }
  });
};

user.foodLog.delete = async (userDetails, logId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await user.prepareForTransaction(userDetails);

      const userRecord = await db.User.updateOne(
        { email: userDetails.email },
        { $pull: { foodLog: { id: logId } } },
        { safe: true, multi: false }
      );

      resolve({ code: 200, log: userRecord.foodLog });
    } catch (e) {
      reject({ code: e.code || 406, error: e.error || "DB Error" });
    }
  });
};

user.foodLog.modify = async (userDetails, log) => {
  return new Promise(async (resolve, reject) => {
    try {
      await user.prepareForTransaction(userDetails);
      await db.User.updateOne(
        { email: userDetails.email },
        { $pull: { foodLog: { id: log.id } } },
        { safe: true, multi: false }
      );

      const oldId = log.id;
      log.id = new mongoose.Types.ObjectId().toString();

      await db.User.updateOne(
        { email: userDetails.email },
        { $push: { foodLog: log } }
      );

      log.oldId = oldId;
      resolve({ code: 200, log: log });
    } catch (e) {
      reject({ code: e.code || 406, error: e.error || "DB Error" });
    }
  });
};

const getDatesTimezoneInfo = (dateTime, period = false) => {
  const dateTimeObj = new Date(dateTime);
  // timezone offset in milliseconds
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  // PDT= UTC-7 PST= UTC-8
  const tzoffsetHour = new Date().getTimezoneOffset() / 60;
  // minus timezone offset to get ISOstring representation of local time
  const localDateTime = new Date(new Date(dateTime) - tzoffset)
    .toISOString()
    .substring(0, 10);
  const dateUTC = dateTime.substring(0, 10);
  const timeUTC = "T0" + tzoffsetHour + ":00:00.000Z";
  let prevDateUTC;
  let nextDateUTC;
  let dateTimeStart;
  let dateTimeEnd;

  if (dateUTC === localDateTime) {
    // Timzone difference: same day
    nextDateUTC = new Date(new Date().setDate(dateTimeObj.getDate() + 1))
      .toISOString()
      .substring(0, 10);
    if (!period) {
      // Food Log
      dateTimeStart = dateUTC + timeUTC;
      dateTimeEnd = nextDateUTC + timeUTC;
    } else {
      // Report
      dateTimeEnd = nextDateUTC + timeUTC;
      dateTimeStart = new Date(
        new Date(dateTimeEnd).setDate(new Date(dateTimeEnd).getDate() - period)
      ).toISOString();
    }
  } else {
    // Timezone difference: the next day (PDT: 5pm -12pm)
    prevDateUTC = new Date(new Date().setDate(dateTimeObj.getDate() - 1))
      .toISOString()
      .substring(0, 10);
    if (!period) {
      // Food Log
      dateTimeStart = prevDateUTC + timeUTC;
      dateTimeEnd = dateUTC + timeUTC;
    } else {
      // Report
      dateTimeEnd = dateUTC + timeUTC;
      dateTimeStart = new Date(
        new Date(dateTimeEnd).setDate(new Date(dateTimeEnd).getDate() - period)
      ).toISOString();
    }
  }
  datesInfo = {
    dateTimeStart: dateTimeStart,
    dateTimeEnd: dateTimeEnd,
  };
  return datesInfo;
};

module.exports = user;
