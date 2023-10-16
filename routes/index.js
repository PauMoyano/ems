const express = require('express');
const userControllers = require('../controllers/users/index');
const weekControllers = require('../controllers/weeks/index');
const dayRecordControllers = require('../controllers/day_records/index');

const router = express.Router();
// TODO move implementation to controller and service layer
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID.
 *                     example: a2b3??cd]]45
 *                   first_name:
 *                     type: string
 *                     description: The user's first name.
 *                     example: Leanne
 *                   last_name:
 *                     type: string
 *                     description: The user's last name.
 *                     example: Graham
 *                   position:
 *                     type: string
 *                     description: The user's position.
 *                     example: Administrador
 *                   salary_per_week:
 *                     type: float
 *                     example: 45
 */
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