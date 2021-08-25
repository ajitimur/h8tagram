const express = require(`express`);
// const router = require(".");
const postRouter = express.Router()
const Controller = require(`../controllers/controller`)
const isLogin = require(`../middleware/checklogin`)

postRouter.get(`/postid/:id`,isLogin, Controller.postId)
postRouter.get(`/add`, isLogin,Controller.getAddPost)
postRouter.post(`/add`, Controller.postAddPost)
postRouter.get(`/delete/:id`, isLogin,Controller.deletePost)
postRouter.get(`/edit/:id`, isLogin,Controller.getEditPost)
postRouter.post(`/edit/:id`, Controller.postEditPost)

module.exports = postRouter