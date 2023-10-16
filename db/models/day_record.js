const { Model } = require('objection');

class DayRecord extends Model {
  static get tableName() {
    return 'day_record';
  }
  static get relationMappings() {
    const Week = require('../models/week');

    return {
      week: {
        relation: Model.HasOneRelation,
        modelClass: Week,
        join: {
          from: 'day_record.week_id',
          to: 'week.id'
        }
      },
    }
  }
}

module.exports = DayRecord;