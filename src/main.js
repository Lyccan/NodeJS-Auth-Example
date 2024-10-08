const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const path = require("path")
const cookieParser = require('cookie-parser')


//routes
const loginRoute = require('../routes/login')
const addRoute = require('../routes/add')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const logoutRoute = require('../routes/logout')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

const port = process.env.PORT


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.get("/welcome", cookieJwtAuth, (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bem-vindo</title>
        </head>
        <body>
            <h1>Bem-vindo, ${req.user.username}!</h1> <!-- Exibe o nome de usuário -->
            <form action="/add" method="post">
                <button>Fazer uma requisição</button>
            </form>
            <form action="/logout" method="post">
                <button type="submit">Logout</button>
            </form>
        </body>
        </html>
    `);
});

app.post('/login', loginRoute)
app.post('/add', cookieJwtAuth, addRoute)
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});



app.listen(port, function (err) {
    if (err) console.log("Error in server setup" + err)
    console.log("Server listening on Port", port);
})