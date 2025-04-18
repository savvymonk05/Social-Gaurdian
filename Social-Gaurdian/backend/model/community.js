const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Link to a post
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  text: String,
  replies: [ReplySchema], // Array of replies
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
