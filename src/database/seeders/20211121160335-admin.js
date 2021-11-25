module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@test.com',
        password: '$2a$07$rJdO90/c2OKeL7znIlFNNuBAK12PGfm93olcsQ5fI7L.tMSKhJ9ii',
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
