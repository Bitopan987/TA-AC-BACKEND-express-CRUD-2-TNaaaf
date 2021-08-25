var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, require: true, ref: 'Author' },
    summary: String,
    pages: Number,
    publication: String,
    cover_image: { type: String, lowercase: true },
    category: String,
  },
  { timestamps: true }
);

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
