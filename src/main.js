const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config()
const path = require("path")
const cookieParser = require('cookie-parser')


const loginRoute = require('../routes/login')
const addRoute = require('../routes/add')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public', {
    index: false
}))

const port = process.env.PORT


app.get('/', (req, res) => {
    const tokenReq = req.cookies.token

    if (!tokenReq) {
        res.sendFile(path.join(__dirname, '..', 'public', "index.html"))
    }
    else {
        res.redirect('/welcome')
    }
})

app.get("/welcome", cookieJwtAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'welcome.html'));
});

app.get('/userinfo', cookieJwtAuth, (req, res) => {
    res.json({ username: req.user.username })
})


app.post('/login', loginRoute)


app.post('/add', cookieJwtAuth, addRoute)


app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


app.listen(port, function (err) {
    if (err) console.log("Error in server setup" + err)
    console.log("Server listening on Port", port);
    console.log(process.env.SECRET)
})