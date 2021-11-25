module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
      },
    });

    await queryInterface.createTable('fav_movies', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
      },
    });

    await queryInterface.createTable('movies', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      comment: {
        type: Sequelize.TEXT(),
      },
      personal_score: {
        type: Sequelize.FLOAT(),
      },
      title: {
        type: Sequelize.STRING(64),
      },
      year: {
        type: Sequelize.STRING(32),
      },
      rated: {
        type: Sequelize.STRING(32),
      },
      released: {
        type: Sequelize.STRING(32),
      },
      runtime: {
        type: Sequelize.STRING(32),
      },
      genre: {
        type: Sequelize.STRING(64),
      },
      director: {
        type: Sequelize.STRING(128),
      },
      writer: {
        type: Sequelize.STRING(128),
      },
      actors: {
        type: Sequelize.STRING(255),
      },
      plot: {
        type: Sequelize.TEXT(),
      },
      language: {
        type: Sequelize.STRING(255),
      },
      country: {
        type: Sequelize.STRING(255),
      },
      awards: {
        type: Sequelize.TEXT(),
      },
      poster: {
        type: Sequelize.STRING(255),
      },
      metascore: {
        type: Sequelize.STRING(32),
      },
      imdb_rating: {
        type: Sequelize.STRING(32),
      },
      imdb_votes: {
        type: Sequelize.STRING(32),
      },
      imdb_id: {
        type: Sequelize.STRING(32),
      },
      type: {
        type: Sequelize.STRING(32),
      },
      dvd: {
        type: Sequelize.STRING(32),
      },
      box_office: {
        type: Sequelize.STRING(32),
      },
      production: {
        type: Sequelize.STRING(32),
      },
      website: {
        type: Sequelize.STRING(32),
      },
      response: {
        type: Sequelize.STRING(32),
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
      },
    });

    // After tables creation
    await queryInterface.addConstraint('fav_movies', {
      fields: ['user_id'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('fav_movies', {
      fields: ['movie_id'],
      type: 'foreign key',
      references: {
        table: 'movies',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables();
  },
};
