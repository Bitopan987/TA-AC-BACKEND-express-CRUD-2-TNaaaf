var express = require('express');
const { render } = require('../app');
var router = express.Router();
var Book = require('../models/book');
var Author = require('../models/author');

router.get('/new', (req, res, next) => {
  res.render('authorCreateForm');
});

router.post('/new', (req, res, next) => {
  let data = req.body;
  Author.create(data, (err, book) => {
    if (err) return next(err);
    res.redirect('/books');
  });
});

module.exports = router;
