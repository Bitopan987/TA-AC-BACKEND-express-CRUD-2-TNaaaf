var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Book = require('../models/book');

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Comment.findById(id, (err, comment) => {
    if (err) return next(err);
    res.render('updateComment', { comment });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, updatedComment) => {
    if (err) return next(err);
    res.redirect('/books/' + updatedComment.bookId);
  });
});

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndDelete(id, (err, comment) => {
    if (err) return next(err);
    Book.findByIdAndUpdate(
      comment.bookId,
      { $pull: { comments: comment._id } },
      (err, book) => {
        res.redirect('/books/' + comment.bookId);
      }
    );
  });
});

module.exports = router;
