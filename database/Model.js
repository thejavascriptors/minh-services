const Sequelize = require('sequelize');
const db = require('./index.js');

// Defines items table
const Items = db.define('items', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: Sequelize.STRING,
},
{
  timestamps: false
});

// Defines users table
const Users = db.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  username: Sequelize.STRING,
},
{
  timestamps: false
});

// Defines questions table
const Questions = db.define('questions', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
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
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
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

// Questions.belongsTo(Items, { as: 'item' });
// Questions.belongsTo(Users, { as: 'user' });
// Answers.belongsTo(Questions, { as: 'question' });
// Answers.belongsTo(Users, { as: 'user' });

// queryInterface.addIndex('Questions', ['itemId'], )

module.exports = {
  Items,
  Users,
  Questions,
  Answers,
};
