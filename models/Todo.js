const Sequelize = require('sequelize');
const db = require('../config/database');

const Todo = db.define('todo', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Todo;
