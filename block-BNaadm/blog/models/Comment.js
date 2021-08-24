var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema(
  {
    text: { type: String, required: true },
    articleId: { type: Schema.Types.ObjectId, required: true, ref: 'Article' },
    author: String,
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
