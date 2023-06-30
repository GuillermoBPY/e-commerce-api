const sequelize = require('../utils/connection');
const user = require('./createData/user');
require('./../models');
const main = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Force True Ejecutado');
    await user(); //Ejecuta la función user para generar un usuario en la bd.
    console.log('user() Ejecutado');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
