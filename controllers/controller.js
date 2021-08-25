const { Post, Hashtag, PostHashtag } = require(`../models`);
const hashtag = require("../models/hashtag");


class Controller{
    static homepage(req, res){
        Post.findAll({
            include: [{ model: Hashtag}]
        })
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
        Hashtag.findAll()
        .then(data => {
            res.render(`add-post`, {data})
        })
        .catch(err => {
            console.log(err);
        })
    }
    static postAddPost(req, res){
        let { contentUrl, title, caption, hashtagId} =req.body
        console.log(req.body);
        let postId = req.params.id
        let postDate = null
        let hashtagIdArr = [] //buat conjuction

        const getHashTags = str => str.match(/#[a-zA-Z0-9]+/g).map(match => match.substring(1));
        let hashtag = getHashTags(caption)
        
        for(let tag of hashtag){
            Hashtag.findAll({
                where: {name: tag}
            })
            .then(data => {
                console.log(data, `<<<`);
                if(data.length > 0){
                    hashtagIdArr.push(data.id)
                } else {
                   return Hashtag.create({name :tag})
                }
            })
            .then(data => {
                return Post.create({ contentUrl, title, caption, postDate})
            })
            .then(data => {
                res.redirect(`/`)

            })
            .catch(gaada => {
                console.log(gaada, `++++`);
            })
        }
        
        // .catch(err => {
        //     Hashtag.create()
        // })
        


        // PR!!!!!
        // Post.create({ contentUrl, title, caption, postDate})
        // .then(data => {
        //     return PostHashtag.create({postId, hashtagId})
            
        // })
        // .then(data => {
        //     res.redirect(`/`)
            
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    }
    static getEditPost(req, res){
        let id = req.params.id
        // blabla #abc >> abc >> abc >> data.id >> post 

        Post.findOne( { where: {id}, include: [{model: Hashtag}] })
        .then(data => {
            // return Hashtag.findAll()
        })
        .then(hashtagAll => {
            res.render(`edit-post`, {})

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