exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE "user" CASCADE');
  await knex.raw('TRUNCATE TABLE "week" CASCADE');
  await knex.raw('TRUNCATE TABLE "day_record" CASCADE');

  await knex('user').insert([
    {
      id: 'abcd1234',
      first_name: 'first_name',
      last_name: 'last_name'
    },
  ]);
};
