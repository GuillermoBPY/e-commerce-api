const sequelize = require('../utils/connection');
const user = require('./createData/user');

const main = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Force True Ejecutado');
    await user();
    console.log('user() Ejecutado');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
