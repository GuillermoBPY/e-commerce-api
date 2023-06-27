const User = require('../../models/User');

const user = async () => {
  const body = {
    firstName: 'PruebaFirstName',
    lastName: 'PruebaLastName',
    email: 'prueba@academlo.com',
    password: '1234',
    phone: '+595975639565',
  };

  await User.create(body);
};

module.exports = user;
