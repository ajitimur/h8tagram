const express = require(`express`);
// const router = require(".");
const postRouter = express.Router()
const Controller = require(`../controllers/controller`)


postRouter.get(`/:id`, Controller.postId)
postRouter.get(`/delete/:id`, Controller.deletePost)
postRouter.get(`/add`, Controller.getAddPost)
postRouter.post(`/add`, Controller.postAddPost)
postRouter.get(`/edit/:id`, Controller.getEditPost)
postRouter.post(`/edit/:id`, Controller.postEditPost)

module.exports = postRouter