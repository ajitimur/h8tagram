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
      Post.belongsTo(models.User)
      Post.belongsToMany(models.Hashtag, { through: `PostHashtags`,  foreignKey: `postId`})
    }
    //  getHashTags = str => str.match(/#[a-zA-Z0-9]+/g).map(match => match.substring(1));
    // getHashtags(str){
    //   return str.match(/#[a-zA-Z0-9]+/g).map(match => match.substring(1));
    // }
  };
  Post.init({
    contentUrl: DataTypes.STRING,
    title: DataTypes.STRING,
    caption: DataTypes.STRING,
    postDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER
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