const { Model } = require('objection');

class Week extends Model {
  static get tableName() {
    return 'week';
  }
  static get relationMappings() {
    const User = require('../models/user');
    const DayRecord = require('../models/day_record');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'week.user_id',
          to: 'user.id'
        }
      },
      day_records: {
        relation: Model.HasManyRelation,
        modelClass: DayRecord,
        join: {
          from: 'week.id',
          to: 'day_record.week_id'
        }
      },
    }
  }
}

module.exports = Week;