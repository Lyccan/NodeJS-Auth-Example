const jwt = require('jsonwebtoken')
const secret = process.env.MY_SECRET

exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;

    try {
        const user = jwt.verify(token, secret)
        req.user = user
        next()
    }
    catch (err) {
        res.clearCookie("token")
        return res.redirect('/')
    }
};