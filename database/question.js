const mongoose = require('mongoose');
const db = require('./index.js');

const QuestionSchema = new mongoose.Schema({
  question_id: Number,
  question: String,
  answer: [{
    user_id: Number,
    user_name: String,
    created_at: String,
    text: String
  }],
  votes: Number
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;