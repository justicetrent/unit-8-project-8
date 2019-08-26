const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const Config = require('../config/config');

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static('public'));

app.get('/', (req, res) => res.redirect('/books'));

app.use('/books', require('./routes/books'));

app.use((req, res, next) => {
    res.locals.error = err;
    console.log('Error status:', err.status);
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render('errorNotFound')
    } else {
        res.render('error')
    }
});

Config.sync()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => console.log('Application running on localhost:3000'))
    })