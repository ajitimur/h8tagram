const {User} = require(`../models`)
const {checkPassword} = require(`../helpers/bcrypt`)

class UserController{
    static register(req,res){
        res.render(`register`)
    }
    static postRegister(req, res){
        let { email, password } = req.body

        User.create( { email, password } )
        .then(data => {
            res.redirect(`login`)
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

}


module.exports = UserController