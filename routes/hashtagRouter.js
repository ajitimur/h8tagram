const express = require(`express`);
// const router = express.Router()
const hashtagRouter = express.Router()
const Controller = require(`../controllers/controller`)
const isLogin = require(`../middleware/checklogin`)


hashtagRouter.get(`/:id`, Controller.findbyHashtag)


module.exports = hashtagRouter