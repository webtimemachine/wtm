const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('web-time-machine', 'myuser', 'mypassword', {
  host: 'db',
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error));

sequelize.sync({ alter: true })
module.exports = sequelize;