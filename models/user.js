'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require(`../helpers/bcrypt`)
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post)
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      unique: {
        msg: `email sudah dipakai`
      }
    },
    password: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};