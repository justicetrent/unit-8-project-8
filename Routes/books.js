const express = require('express');
const router = express.Router();
const Books = require('../models/Book');




//route that renders home page of webpage
router.get('/', (req, res) => {
    Books.findAll()
        .then(books => {
            res.render('index', { books: books });
        })
        .catch(err => console.log(err))
});


//route that renders webpage to create/add a new book to the database, the get request creates a new blank shell of information that is necessary in order for the the database to accept the new entry. 
router.get('/new', (req, res) => res.render('new-book'));
//posts the new database entry to the webpage and updates the data-base with the new entry. 
router.post('/new', (req, res) => {
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
                res.render('new-book', { err: err.errors });
            } else {
                throw err;
            }
        })
        .catch(err => console.log(err))
});



//route that renders the ability to delete an entry from the database, and posts it, meaning that the user will no longer see the book on the webpage. 
router.post('/:id/delete', (req, res) => {
    Books.findByPk(req.params.id)
        .then(Book => {
            if (Book) {
                return Book.destroy();
            } else {
                res.render('error');
            }
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
});

//route that gets book id 
router.get('/:id', (req, res) => {
    Books.findByPk(req.params.id)
        .then(book => {
            res.render('update-book', { book });
        })
        .catch(err => console.log(err))
});


router.post('/:id', (req, res) => {
    Books.findByPk(req.params.id)
        .then(Book => {
            if (Book) {
                return Book.update(req.body);
            } else {
                res.render('error');
            }
        })
        .then(() => res.redirect('/'))
        .catch(err => {
            if (err.name === "SequelizeValidationError") {
                let book = Books.build(req.body);
                book.dataValues.id = req.params.id;
                console.log(book)
                res.render('update-book', { book, err: err.errors });
            } else {
                throw err;
            }
        })
        .catch(err => console.log(err))
});


module.exports = router;