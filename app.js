const express = require('express')
const app = express()
const port = 3000
const router = require(`./routes/index`)
const passport = require('passport')

const session = require(`express-session`)
require('./config/passport')(passport)

app.set(`view engine`, `ejs`)
app.use(express.urlencoded({extended: true}))

// app.get('/', (req, res) => {
//       res.send('Hello World!')
//     })
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(`/`, router)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })