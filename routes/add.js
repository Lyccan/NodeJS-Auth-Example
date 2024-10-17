const { cookieJwtAuth } = require("../middleware/cookieJwtAuth")

module.exports = (req, res) => {
    res.redirect('/welcome')

    //Aditional code with what u wanna do
}

