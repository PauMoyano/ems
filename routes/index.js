const express = require('express');
const userControllers = require('../controllers/users/index');
const weekControllers = require('../controllers/weeks/index');
const dayRecordControllers = require('../controllers/day_records/index');

const router = express.Router();
// TODO move implementation to controller and service layer
router.get('/user/:id', userControllers.getUser);
router.get('/users', userControllers.getUsers);
router.post('/user', userControllers.createUser);
router.delete('/user', userControllers.deleteUser);
router.get('/week/:id', weekControllers.getWeek);
router.get('/weeks', weekControllers.getWeeks);
router.post('/week', weekControllers.createWeek);
router.get('/weeks/employes_reports', weekControllers.employesPaymentReport);
router.get('/weeks/employee_reports', weekControllers.employeePaymentReport);
router.get('/day_record/:id', dayRecordControllers.getDayRecord);
router.post('/day_record', dayRecordControllers.createDayRecord);
router.put('/day_record/:id', dayRecordControllers.updateDayRecord);
router.post('/day_record/checkout', dayRecordControllers.checkOut);

module.exports = router;