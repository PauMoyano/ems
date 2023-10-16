const DayRecord = require('../../db/models/day_record');
const Week = require('../../db/models/week');

const getDayRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await DayRecord.query().findById(id).withGraphFetched('week');
    res.json(record);
  } catch (err) {
    res.status(400).json(err);
  }
};
const createDayRecord = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const week = await Week.query().where({ user_id: user_id});
    const body = {
      week_id: week[0].id,
      income: new Date()
    }
    const record = await DayRecord.query().insert(body);
    res.json(record);
  } catch (err) {
    res.status(400).json(err);
  }
};
const updateDayRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body  = req.body;
    const record = await DayRecord.query()
    .findById(id)
    .patch(body);
    res.json(record);
  } catch (err) {
    res.status(400).json(err);
  }
};
const checkOut = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const week = await Week.query().where({ user_id: user_id}).withGraphFetched('user');
    const records = await DayRecord.query().where({ week_id: week[0].id });
    const lastRecord = records[records.length - 1];
    const currentDateObj = new Date();
    const currentSeconds = currentDateObj.getHours() * 3600 + currentDateObj.getMinutes() * 60 + currentDateObj.getSeconds();
    const incomeSeconds = lastRecord.income.getHours() * 3600 + lastRecord.income.getMinutes() * 60 + lastRecord.income.getSeconds();
    const seconds = currentSeconds - incomeSeconds;
    let extraHours = 0;
    const body = {
      egress: currentDateObj
    }
    if(seconds/3600 > 0){
      body['hours_worked'] = (seconds/3600);
      extraHours = seconds/3600 > 8 ? seconds/3600 - 8 : 0;
    }

    const payment = week[0].user.salary_per_week && week[0].user.salary_per_week > 0 && extraHours > 0 ? (week[0].user.salary_per_week / 40) * extraHours : null;
    if ((week[0].user.salary_per_week / 40) * (seconds/3600) > 0) {
      body['overtime_payment'] = payment;
    }
    const newRecord = await DayRecord.query()
    .findById(lastRecord.id)
    .patch(body);
    res.json(newRecord);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getDayRecord,
  createDayRecord,
  updateDayRecord,
  checkOut
};