const Sequelize = require('sequelize');
const db = require('./index.js');

// Definition of a Primary key id
const id = {
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  type: Sequelize.INTEGER,
};

// Defines items table
const Items = db.define('items', {
  id,
  name: Sequelize.STRING,
},
{
  timestamps: false
});

// Defines users table
const Users = db.define('users', {
  id,
  username: Sequelize.STRING,
},
{
  timestamps: false
});

// Defines questions table
const Questions = db.define('questions', {
  id,
  itemId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'items',
      key: 'id',
      as: 'itemId',
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'id',
      as: 'userId',
    }
  },
  question: Sequelize.STRING(510),
  rating: Sequelize.INTEGER,
  createdAt: Sequelize.STRING,
},
{
  indexes: [
    {
      fields: ['itemId'],
    },
    {
      fields: ['userId'],
    }
  ],
  timestamps: false
});

// Defines answers table
const Answers = db.define('answers', {
  id,
  questionId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'questions',
      key: 'id',
      as: 'questionId',
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'id',
      as: 'userId',
    }
  },
  answer: Sequelize.STRING(510),
  createdAt: Sequelize.STRING,
  rating: Sequelize.INTEGER,
},
{
  indexes: [
    {
      fields: ['questionId'],
    },
    {
      fields: ['userId'],
    }
  ],
  timestamps: false
});

module.exports = {
  Items,
  Users,
  Questions,
  Answers,
};
