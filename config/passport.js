const GoogleStrategy = require('passport-google-oauth20').Strategy
const {User} = require(`../models`)
const {checkPassword, hashPassword} = require(`../helpers/bcrypt`)

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: '899562911790-638vl97f5t3d68st4pc4esluhr96u37j.apps.googleusercontent.com',
        clientSecret: 'VLpNjA8zXn0KkmP6NXNgv_PD',
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google 
        // const newUser = {
        //   googleId: profile.id,
        //   displayName: profile.displayName,
        //   firstName: profile.name.givenName,
        //   lastName: profile.name.familyName,
        //   image: profile.photos[0].value,
        //   email: profile.emails[0].value
        // }
        let password = hashPassword('123')
        const newUser = {
            username: profile.emails[0].value.split('@')[0],
            email: profile.emails[0].value,
            password: password
        }

        try {
            //find the user in our database 
            let user = await User.findOne({ where: {
                email: newUser.email
            } })
  
            if (user) {
              //If user present in our database.
              done(null, user)
            } else {
              // if user is not preset in our database save user data to database.
              user = await User.create(newUser)
              done(null, user)
            }
          } catch (err) {
            console.error(err)
          }
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    //   console.log(id)
    User.findOne({
        where: {
            id: id
        }
    })
    .then(data => {
        done(null, data)
    })
    .catch(err => {
        done(err, null)
    })
  })
}