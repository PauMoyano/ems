const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'user';
  }
  static get relationMappings() {
    const Week = require('../models/week');
    return {
      week: {
        relation: Model.BelongsToOneRelation,
        modelClass: Week,
        join: {
          from: 'user.id',
          to: 'week.user_id'
        }
      },
    }
  }
}

module.exports = User;