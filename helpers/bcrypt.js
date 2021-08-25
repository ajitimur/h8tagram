const bcrypt = require(`bcrypt`)
let salt = bcrypt.genSaltSync(10);

function hashPassword(plain) {
    return bcrypt.hashSync(plain, salt)
}

function checkPassword(plain, hashed){
    return bcrypt.compareSync
}

module.exports = { hashPassword, checkPassword}
