const { cookieJwtAuth } = require("../middleware/cookieJwtAuth")

module.exports = (req, res) => {
    res.redirect('/welcome')
}