const { Post, Hashtag, PostHashtag, User } = require(`../models`);
// const hashtag = require("../models/hashtag");
// const hashtag = require("../models/hashtag");

class Controller {
  static homepage(req, res) {
    let id = req.session.userId;
    let dataUser;
    User.findByPk(id, {
      include: [{ model: Post }],
    })
      .then((data) => {
        dataUser = data;
        return Post.findAll({
          include: [{ model: Hashtag }],
        });
      })
      .then((data) => {
        // res.send({ data, dataUser });
        res.render("home", { data, dataUser });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static postId(req, res) {
    let id = req.params.id;
    let dataUser;
    let userId;

    Post.findByPk(id)
      .then((data) => {
        dataUser = data;
        return User.findOne({
          where: {
            id: req.session.userId,
          },
          include: [{ model: Post }],
        });
      })
      .then((data) => {
        res.render("post", { data, dataUser });
      });
  }
  static deletePost(req, res) {
    let id = req.params.id;

    Post.destroy({ where: { id } })
      .then((data) => {
        res.redirect(`/profile/${req.session.userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static getAddPost(req, res) {
    let id = req.session.userId;
    let dataUser;
    User.findByPk(id, {
      include: [{ model: Post }],
    })
      .then((data) => {
        dataUser = data;
        res.render("add-post", { dataUser });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static postAddPost(req, res) {
    let { contentUrl, title, caption, hashtagId } = req.body;
    console.log(req.body);
    let postId = req.params.id;
    let postDate = null;
    let hashtagIdArr = []; //buat conjuction
    let newPost;
    console.log(req.session);

    Post.create({ contentUrl, title, caption, UserId: req.session.userId })
      .then((data) => {
        newPost = data;
        const getHashTags = (str) =>
          str.match(/#[a-zA-Z0-9]+/g).map((match) => match.substring(1));
        let hashtag = getHashTags(caption);

        for (let tag of hashtag) {
          let id = 0;
          Hashtag.findOne({
            where: { name: tag },
          })
            .then((data) => {
              console.log(data, "teste");
              if (data) {
                //update
                PostHashtag.create({ postId: newPost.id, hashtagId: data.id });
              } else {
                //create
                Hashtag.create({ name: tag }).then((data) => {
                  return PostHashtag.create({
                    postId: newPost.id,
                    hashtagId: data.id,
                  });
                });
              }
            })
            .catch((gaada) => {
              console.log(gaada, `++++`);
            });
          console.log("disin dulu");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    res.redirect(`/profile/${req.session.userId}`);
  }
  static getEditPost(req, res) {
    let id = req.params.id;
    // blabla #abc >> abc >> abc >> data.id >> post

    let dataUser;
    User.findOne({
      where: {
        id: req.session.userId,
      },
      include: [{ model: Post }],
    })
      .then((data) => {
        dataUser = data;
        return Post.findOne({ where: { id }, include: [{ model: Hashtag }] });
      })
      .then((data) => {
        // return Hashtag.findAll()
        // res.send(data)
        res.render(`edit-post`, { data, dataUser });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static postEditPost(req, res) {
    let id = req.params.id;
    let { contentUrl, title, caption } = req.body;
    console.log(req.body);

    const getHashTags = (str) =>
      str.match(/#[a-zA-Z0-9]+/g).map((match) => match.substring(1));
    let hashtag = getHashTags(caption);

    Post.update({ contentUrl, title, caption }, { where: { id } })
      .then((data) => {
        // res.redirect(`/`)
        for (let tag of hashtag) {
          let id = 0;
          Hashtag.findOne({
            where: { name: tag },
          })
            .then((data) => {
              console.log(data, "teste");
              if (data) {
                //update
                PostHashtag.create({ postId: id, hashtagId: data.id });
              } else {
                //create
                Hashtag.create({ name: tag }).then((data) => {
                  return PostHashtag.create({ postId: id, hashtagId: data.id });
                });
              }
            })
            .catch((gaada) => {
              console.log(gaada, `++++`);
            });
          console.log("disin dulu");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    res.redirect(`/`);
  }
  static findbyHashtag(req, res) {
    let hashtagId = req.params.id;
    // console.log(req.params.id, req.session.userId);
    let dataUser;
    User.findOne({
      where: {
        id: req.session.userId,
      },
      include: [{ model: Post }],
    })
      .then((data) => {
        dataUser = data;
        return Hashtag.findAll({
          where: { id: hashtagId },
          include: [{ model: Post }],
        });
      })

      .then((data) => {
        res.render(`hashtag`, { data, dataUser });
        // res.send({ data, dataUser });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static profile(req, res) {
    let id = req.session.userId;
    let dataUser;

    User.findByPk(id, {
      include: [{ model: Post }],
    })
      .then((data) => {
        // res.send(data);
        dataUser = data;
        return Post.findAll({
          where: { UserId: dataUser.id },
          include: [{ model: Hashtag }],
        });
        // ke profile page
      })
      .then((data) => {
        // res.send({ data, dataUser });
        res.render("profile", { data, dataUser });
      })

      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Controller;
