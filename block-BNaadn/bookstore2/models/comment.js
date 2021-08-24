var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema(
  {
    content: { type: String, required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  },
  { timestamps: true }
);

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
