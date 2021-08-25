var express = require('express');
const { render } = require('../app');
var router = express.Router();
var Book = require('../models/book');
var Author = require('../models/author');

router.get('/', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.render('bookList', { books: books });
  });
});

router.get('/new', (req, res, next) => {
  Author.find({}, (err, authors) => {
    if (err) return next(err);
    res.render('addBook', { authors });
  });
});

router.post('/new', (req, res, next) => {
  Book.create(req.body, (err, createdbook) => {
    if (err) return next(err);
    res.redirect('/books');
  });
});

router.get('/:id', (req, res, next) => {
  let bookId = req.params.id;
  Book.findById(bookId, (err, book) => {
    if (err) return next(err);
    let authorId = book.author;
    console.log('authorid', authorId);
    Author.findById(authorId, (err, author) => {
      if (err) return next(err);
      res.render('bookDetails', { book, author });
    });
  });
});

module.exports = router;
