const mongoose = require('mongoose');
const db = require('./index.js');

const QuestionSchema = new mongoose.Schema({
  _id: Number,
  question: String,
  answer: [{
    _id: Number,
    username: String,
    createdAt: String,
    text: String
  }],
  votes: Number
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;