const express = require(`express`);
const router = require(".");
const postRouter = express.Router()
const Controller = require(`../controllers/controller`)


router.get(`/:id`, Controller.postId)
router.get(`/delete/:id`, Controller.deletePost)
router.get(`/add`, Controller.getAddPost)
router.post(`/add`, Controller.postAddPost)
router.get(`/edit/:id`, Controller.getEditPost)
router.post(`/edit/:id`, Controller.postEditPost)

module.exports = postRouter