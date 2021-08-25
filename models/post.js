'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Movie.belongsToMany(models.Cast, { through: 'MovieCast' });
      Post.belongsToMany(models.Hashtag, { through: `PostHashtags`,  foreignKey: `postId`})
    }
  };
  Post.init({
    contentUrl: DataTypes.STRING,
    title: DataTypes.STRING,
    caption: DataTypes.STRING,
    postDate: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        if(!instance.postDate){
          instance.postDate = new Date()
        }
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};