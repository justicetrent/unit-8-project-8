const express = require('express');
const router = express.Router();
const Books = require('../models/Books');

router.get('/', (req, res) => {
    Books.findAll()
        .then(books => {
            res.render('index', { books: books });
        })
        .catch(err => console.log(err))
})

router.get('/new', (req, res) => res.render('new-book'));

router.post('./new', (req, res) => {
    let { title, author, genre, year } = req.body;
    Books.create({
        title,
        author,
        genre,
        year
    })
        .then(() => res.redirect('/'))
        .catch(err => {
            if (err.name === "SequelizeValidationError") {
                res.render('new-book', { err: err.errors })
            } else {
                throw err;
            }
        })
        .catch(err => console.log(err))
});

router.get('./:id', (req, res) => {
    Books.findByPk(req.params.id)
        .then(book => {
            res.render('update-book', { book });
        })
        .catch(err => console.log(err))
});

router.post('/:id', (req, res) => {
    Books.findBypk(req.params.id)
        .then(Book => {
            if (Book) {
                return Book.update(req.body);
            } else {
                res.render('error')
            }
        })
        .then(() => res.redirect('/'))
        .catch(err => {
            if (err.name === "SequelizevalidationError") {
                let book = Books.build(req.body);
                book.dataValues.id = req.params.id;
                console.log(book)
                res.render('update-book', { book, err: err.errors });
            } else {
                throw err;
            }
        })
        .catch(err => console.log(err))
})  