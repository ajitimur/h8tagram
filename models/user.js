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
        msg: `email is already used`
      },
      validate: {
        isEmail: {
          msg: `required an email`
        }
      }
    },
    password: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: `username is already used`
      }
    }
    
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