var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var Comment = require('../models/comment');

router.get('/', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.render('books', { books: books });
  });
});

router.get('/new', (req, res) => {
  res.render('addBook');
});

router.post('/', (req, res) => {
  Book.create(req.body, (err, createdbook) => {
    if (err) return next(err);
    res.redirect('/books');
  });
});

// router.get('/:id', (req, res, next) => {
//   var id = req.params.id;
//   Book.findById(id, (err, book) => {
//     if (err) return next(err);
//     res.render('bookDetails', { book: book });
//   });
// });

// router.get('/:id', (req, res, next) => {
//   var id = req.params.id;
//   Book.findById(id, (err, book) => {
//     if (err) return next(err);
//     Comment.find({ bookId: id }, (err, comments) => {
//       res.render('bookDetails', { book, comments });
//     });
//   });
// });

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id)
    .populate('comments')
    .exec((err, book) => {
      if (err) return next(err);
      res.render('bookDetails', { book });
    });
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.render('editBookForm', { book: book });
  });
});

router.post('/:id', (req, res) => {
  var id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, updatedBook) => {
    if (err) return next(err);
    res.redirect('/books/' + id);
  });
});

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, book) => {
    if (err) return next(err);
    Comment.deleteMany({ bookId: book.id }, (err, info) => {
      res.redirect('/books');
    });
  });
});

router.post('/:id/comments', (req, res, next) => {
  var id = req.params.id;
  req.body.bookId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Book.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      (err, updatedbook) => {
        if (err) return next(err);
        res.redirect('/books/' + id);
      }
    );
  });
});

module.exports = router;
