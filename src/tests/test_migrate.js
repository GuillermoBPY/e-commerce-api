const sequelize = require('../utils/connection');
const user = require('./createData/user');
require('../models');
const main = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Initialized test set🃏');
    await user();
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
