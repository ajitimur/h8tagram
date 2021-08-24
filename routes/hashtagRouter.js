const express = require(`express`);
const router = require(".");
const hashtagRouter = express.Router()
const Controller = require(`../controllers/controller`)


router.get(`/:id`, Controller.findbyHashtag)


module.exports = hashtagRouter