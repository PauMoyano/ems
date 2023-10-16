const Week = require('../db/models/week');
async function updateWeeks( id, body) {
  const aux = await Week.query()
        .findById(id)
        .patch(body);
}

module.exports = { updateWeeks }