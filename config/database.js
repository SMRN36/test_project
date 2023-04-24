const Sequelize = require('sequelize');

module.exports = new Sequelize('test_project', 'root', 'Mysql@simran', {
  host: 'localhost',
  dialect: 'mysql'
});
