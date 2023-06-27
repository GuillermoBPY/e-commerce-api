const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const bcrypt = require("bcrypt");

const User = sequelize.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  // delete values.phone; se puede ir agregando más datos para no mostrar
  return values;
};

//User.beforeCreate Hook utilizado para realizar algo antes de que se cree el modelo
User.beforeCreate(async (user) => {
  hashPassword = await bcrypt.hash(user.password, 10);
  user.password = hashPassword;
});

module.exports = User;
