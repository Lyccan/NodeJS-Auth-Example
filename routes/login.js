const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser')

const secret = process.env.MY_SECRET

const getUser = async (username) => {
    return { userId: 123, password: "123456", username: username }
}

module.exports = async (req, res) => {
    const { username, password } = req.body


    const user = await getUser(username)

    if (user.password !== password) {
        console.log(username, password)
        return res.status(404).json({
            error: "invalid login"
        })
    }

    delete user.password;

    const token = jwt.sign({ username: user.username }, secret, { expiresIn: "1h" })

    res.cookie("token", token, {
        httpOnly: true,

        // Options to use:
        //secure: true
        //maxAge: 900000
        //signed: true
    })

    return res.redirect('/welcome')
}