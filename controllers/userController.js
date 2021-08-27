const {User} = require(`../models`)
const {checkPassword, hashPassword} = require(`../helpers/bcrypt`)
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('899562911790-638vl97f5t3d68st4pc4esluhr96u37j.apps.googleusercontent.com');
class UserController{
    static register(req,res){
        res.render(`register`)
    }
    static postRegister(req, res){
        let { email, password } = req.body

        let hashedPass = hashPassword(password)

        User.create( { email, password: hashedPass } )
        .then(data => {
            res.redirect(`login`)
        })
        .catch(err => {
            console.log(err.errors.map((each) => each.message));
        })
    }
    static login(req, res){
        res.render(`login`)
    }
    static loginPost(req, res){
        let { email, password } = req.body

        User.findOne({
            where: {email}
        })
        .then(data => {
            if (data){
                let comparePassword = checkPassword(password, data.password)
                if(comparePassword){
                    req.session.isLogin = true
                    req.session.email = data.email
                    req.session.userId = data.id
                    res.redirect(`/`)
                }
                else{
                    res.send(`email/password salah`)
                }
                
            } else {
                res.send(`email tidak terdaftar`)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    static logout(req, res){
        req.session.destroy()
        res.redirect(`/login`)
    }
    static googleLogin(req, res, next){
       req.session.isLogin = true
       req.session.email = req.user.email
       req.session.userId = req.user.id
       res.redirect(`/`)
    }

}


module.exports = UserController