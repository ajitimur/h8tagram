const express = require(`express`);
// const router = express.Router()
const hashtagRouter = express.Router()
const Controller = require(`../controllers/controller`)


hashtagRouter.get(`/:id`, Controller.findbyHashtag)


module.exports = hashtagRouter