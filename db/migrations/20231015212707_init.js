exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.string('id').primary().unique();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('position');
    table.float('salary_per_week');
    table.timestamps(true, true);
  })
  .createTable('week', (table) =>{
    table.increments();
    table.datetime('start', { precision: 6 }).notNullable();
    table.float('final_hours')
    table.float('final_payment')
    table.string('user_id').references('id').inTable('user');
    table.timestamps(true, true);
  })
  .createTable('day_record', (table) =>{
    table.increments();
    table.datetime('income', { precision: 6 }).notNullable();
    table.datetime('egress', { precision: 6 });
    table.float('hours_worked');
    table.float('overtime_payment');
    table.integer('week_id').references('id').inTable('week');
    table.timestamps(true, true);
  })
};


exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('dayRecord')
  .dropTableIfExists('week')
  .dropTableIfExists('user');
};
