const express = require(`express`);
const Controller = require("../controllers/controller");
const hashtagRouter = require("./hashtagRouter");
const postRouter = require("./postRouter");
const router = express.Router()

router.get(`/`, Controller.homepage)
router.use(`/post`, postRouter);
router.use(`/hashtag`, hashtagRouter);


module.exports = router