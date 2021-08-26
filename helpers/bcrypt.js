const bcrypt = require(`bcryptjs`)

function hashPassword(plain) {
    // let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plain, 10)
}

function checkPassword(plain, hashed){
    return bcrypt.compareSync
}

module.exports = { hashPassword, checkPassword}
