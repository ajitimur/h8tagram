const { Post, Hashtag, PostHashtag } = require(`../models`);
// const hashtag = require("../models/hashtag");
// const hashtag = require("../models/hashtag");


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
        let newPost
        console.log(req.session);

        Post.create({ contentUrl, title, caption, UserId: req.session.userId})
        .then(data => {
            newPost = data
            const getHashTags = str => str.match(/#[a-zA-Z0-9]+/g).map(match => match.substring(1));
            let hashtag = getHashTags(caption)
            
            for(let tag of hashtag){
                let id = 0;
                Hashtag.findOne({
                    where: {name: tag}
                })
                .then(data => {
                    console.log(data, 'teste')
                    if(data) {
                        //update
                        PostHashtag.create({postId:newPost.id, hashtagId:data.id})
                        
                    } else {
                        //create
                        Hashtag.create({name:tag})
                        .then(data => {
                            return PostHashtag.create({postId:newPost.id, hashtagId:data.id} )
                        })
                        
                    }
                })
                .catch(gaada => {
                    console.log(gaada, `++++`);
                })
                console.log('disin dulu')
               
            }
        })
        .catch(err => {
            console.log(err);
        })


       
        res.redirect(`/`)
    }
    static getEditPost(req, res){
        let id = req.params.id
        // blabla #abc >> abc >> abc >> data.id >> post 

        Post.findOne( { where: {id}, include: [{model: Hashtag}] })
        .then(data => {
            // return Hashtag.findAll()
            // res.send(data)
            res.render(`edit-post`, {data})
        })
        .then(hashtagAll => {

        })
        .catch(err => {
            console.log(err);
        })
    }
    static postEditPost(req, res){
        let id = req.params.id
        let { contentUrl, title, caption} = req.body
         console.log(req.body)

         const getHashTags = str => str.match(/#[a-zA-Z0-9]+/g).map(match => match.substring(1));
         let hashtag = getHashTags(caption)

        Post.update({contentUrl, title, caption},{ where: {id} })
        .then(data => {
            // res.redirect(`/`)
            for(let tag of hashtag){
                let id = 0;
                Hashtag.findOne({
                    where: {name: tag}
                })
                .then(data => {
                    console.log(data, 'teste')
                    if(data) {
                        //update
                        PostHashtag.create({postId:id, hashtagId:data.id})
                        
                    } else {
                        //create
                        Hashtag.create({name:tag})
                        .then(data => {
                            return PostHashtag.create({postId:id, hashtagId:data.id} )
                        })
                        
                    }
                })
                .catch(gaada => {
                    console.log(gaada, `++++`);
                })
                console.log('disin dulu')
               
            }
        })
        .catch(err => {
            console.log(err);
        })


       
        res.redirect(`/`)
    }
    static findbyHashtag(req, res){
        let hashtagId = req.params.id

        Hashtag.findAll( {where : {id:hashtagId}, include: [{ model: Post}]})
        .then(data => {
            // res.render(`hashtag`, {data})
            res.send(data)
        })
        .catch(err => {
            console.log(err);
        })
    }
    static profile(req, res){
        let id = req.params.id

        Post.findAll({ where: {id}})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err);
        })
    }
}


module.exports = Controller