const Week = require('../../db/models/week');
const DayRecord = require('../../db/models/day_record');
const { updateWeeks } = require('../../services/weeks')

const getWeek = async (req, res, next) => {
  try {
    const { id } = req.params;
    const week = await Week.query().findById(id).withGraphFetched('user');
    res.json(week);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
const getWeeks = async (req, res, next) => {
  try {
    const weeks = await Week.query().withGraphFetched('user');
    res.json(weeks);
  } catch (err) {
    res.status(400).json(err);
  }
};
const employesPaymentReport = async (req, res, next) => {
  try {
    const weeks = await Week.query().withGraphFetched('day_records').withGraphFetched('user');
    let weeksPayments = []
    const reports = weeks.map((week) => {
      let countHours = 0;
      let countpayments = 0;
      if(week.final_hours === null && week.final_payment === null) {
        week.day_records.forEach(dayRecord => {
          countHours =+ dayRecord.hours_worked;
          countpayments =+ dayRecord.overtime_payment;
        });
        const finalPayment = (week.user.salary_per_week/40) * week.day_records.length + countpayments;
        const updateWeek = {
          week_id: week.id,
          body: {
            final_hours: countHours,
            final_payment: finalPayment
          }
        }
        weeksPayments.push(updateWeek)
      }
    });
    weeksPayments.forEach(weekPayment => {
      updateWeeks(weekPayment.week_id, weekPayment.body)
    });
    const newWeeks = await Week.query().withGraphFetched('day_records').withGraphFetched('user');
    res.json(newWeeks);
  } catch (error) {
    
  }
};
const employeePaymentReport = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    let updateWeek = {};
    const week = await Week.query().where({ user_id: user_id}).withGraphFetched('day_records').withGraphFetched('user');
      let countHours = 0;
      let countpayments = 0;
      if(week.final_hours === null && week.final_payment === null) {
        week.day_records.forEach(dayRecord => {
          countHours =+ dayRecord.hours_worked;
          countpayments =+ dayRecord.overtime_payment;
        });
        const finalPayment = (week.user.salary_per_week/40) * week.day_records.length + countpayments;
        updateWeek = {
          body: {
            final_hours: countHours,
            final_payment: finalPayment
          }
        }
      }
    const aux = await Week.query()
      .findById(week.id)
      .patch(updateWeek.body);
    const newWeek = await Week.query().findById(week.id).withGraphFetched('day_records').withGraphFetched('user');
    res.json(newWeek);
  } catch (error) {
    
  }
  
};
const createWeek = async (req, res, next) => {
  try {
    const body  = req.body;
    const week = await Week.query().insert(body);
    res.json(week);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = {
  getWeek,
  getWeeks,
  createWeek,
  employesPaymentReport,
  employeePaymentReport
};