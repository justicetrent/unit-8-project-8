const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const Config = require('./config/config');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/books'));

app.use('/books', require('./routes/books'));

app.use((req, res, next) => {
    const err = new Error('error');
    err.status = 404;
    next(err);
    res.render('error')
    console.log(err);
});
app.use((err, req, res, next) => {
    res.locals.error = err
    res.status(err.status)
});

Config.sync()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => console.log('Application running on localhost:3000'))
    })
