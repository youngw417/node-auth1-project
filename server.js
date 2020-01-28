const express = require('express');
const cors = require('cors');
const ApiRoute = require('./users/apiRoute');
const session = require('express-session');
const server = express();

const sessionConfig = {
    name: 'monkey',
    secret: 'keep it secret, keep iit safe',
    cookie: {
        maxAge: 1000 * 30,
        secure: false,
        httpOnly: true

    },
    resave: false,
    saveUninitialized: false
}
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
server.use('/api', ApiRoute);

server.use((err, req, res, next) => {
    console.log('error', err);
    res.status(500).json( {
        error: err.message
    })
})

module.exports = server;
