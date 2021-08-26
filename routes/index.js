const express = require(`express`);
const Controller = require("../controllers/controller");
const UserController = require("../controllers/userController");
const hashtagRouter = require("./hashtagRouter");
const postRouter = require("./postRouter");
const router = express.Router()
const isLogin = require(`../middleware/checklogin`)
const passport = require('passport')



router.get(`/register`, UserController.register)
router.post(`/register`, UserController.postRegister)
router.get(`/login`, UserController.login)
router.post(`/login`, UserController.loginPost)
router.get(`/google/login`, UserController.googleLogin)
router.get(`/logout`, UserController.logout)

router.get(`/profile/:id`, isLogin, Controller.profile)

router.get(`/`, isLogin, Controller.homepage)
router.use(`/post`,  postRouter);
router.use(`/hashtag`, hashtagRouter);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }))
router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // console.log(res.req.user)
        res.redirect('/google/login')
    }
  )
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})





module.exports = router