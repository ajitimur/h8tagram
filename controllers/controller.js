const { Post, Hashtag, PostHashtag } = require(`../models`)


class Controller{
    static homepage(req, res){
        Post.findAll()
        .then(data => {
            res.render(`home`, {data})
        })
        .catch(err => {
            console.log(err);
        })
    }
    static postId(req, res){
        let id = req.params.id
        Post.findOne({where: {id}})
        .then(data => {
            res.render(`post`, {data})
        })
        .catch(err => {
            console.log(err);
        })
    }
    static deletePost(req, res){
        let id = req.params.id

        Post.destroy({where: {id} })
        .then(data => {
            res.redirect(`/`)
        })
        .catch(err => {
            console.log(err);
        })
    }
    static getAddPost(req, res){
        res.render(`add-post`)
    }
    static postAddPost(req, res){
        let { contentUrl, title, caption, postDate} =req.body

        Post.create({ contentUrl, title, caption, postDate})
        .then(data => {
            res.redirect(`/`)
        })
        .catch(err => {
            console.log(err);
        })
    }
    static getEditPost(req, res){
        let id = req.params.id

        Post.findOne( { where: {id} })
        .then(data => {
            res.render(`edit-post`, {data})
        })
        .catch(err => {
            console.log(err);
        })
    }
    static postEditPost(req, res){
        let id = req.params.id

        Post.update({ where: {id} })
        .then(data => {
            res.redirect(`/`)
        })
        .catch(err => {
            console.log(err);
        })
    }
    static findbyHashtag(req, res){
        let hashtagId = req.params.id

        Hashtag.findAll( {where : {hashtagId}, include: [{ model: Post}]})
        .then(data => {
            res.render(`hashtag`, {data})
        })
        .catch(err => {
            console.log(err);
        })
    }
}


module.exports = Controller