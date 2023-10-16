const { idGenerator } = require('../concerns/users');
const User = require('../../db/models/user');
const Week = require('../../db/models/week');

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.query().findById(id);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.query();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};
const createUser = async (req, res, next) => {
  try {
    const body  = req.body
    const id = idGenerator();
    body['id'] = id;
    const user = await User.query().insert(body);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id }  = req.body
    console.log(id);
    const user = await User.query().delete()
    .whereExists(User.relatedQuery('week').where('week.user_id', id))
    res.json({msg: 'delete user'});
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { getUser, getUsers, createUser, deleteUser};