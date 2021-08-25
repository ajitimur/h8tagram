const express = require(`express`);
const Controller = require("../controllers/controller");
const UserController = require("../controllers/userController");
const hashtagRouter = require("./hashtagRouter");
const postRouter = require("./postRouter");
const router = express.Router()
const isLogin = require(`../middleware/checklogin`)

router.get(`/register`, UserController.register)
router.post(`/register`, UserController.postRegister)
router.get(`/login`, UserController.login)
router.post(`/login`, UserController.loginPost)
router.get(`/logout`, UserController.logout)

router.get(`/`, isLogin, Controller.homepage)
router.use(`/post`,  postRouter);
router.use(`/hashtag`, hashtagRouter);






module.exports = router