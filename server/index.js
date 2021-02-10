const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/index');
const {
  Items,
  Users,
  Questions,
  Answers
} = require('../database/Model');
const { Op } = require('sequelize');
const { performance } = require('perf_hooks');


const PORT = 1337;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Finds and sends questions that match criteria
app.get('/api/:itemId/questions', (req, res) => {
  const start = performance.now();
  const { itemId } = req.params;
  const { question } = req.query;
  const sortBy = [['rating', 'DESC']];

  return Questions.findAll({
    where: {
      itemId,
      question: {
        [Op.like]: `%${question}%`,
      },
    },
    order: sortBy,
  })
    .then((results) => {
      const end = performance.now();
      console.log('It took', ((end - start)), 'milliseconds to return a response');
      res.send(results);
    })
    .catch((err) => { console.error(err); });
});

// Increments or decrements rating of a question
app.patch('/api/questions/:questionId', (req, res) => {
  const start = performance.now();
  const { questionId } = req.params;
  const { vote } = req.query;

  if (vote === 'increment') {
    return Questions.increment(
      'rating',
      {
        where: {
          id: questionId,
        }
      })
      .then(() => {
        const end = performance.now();
        console.log('It took', ((end - start)), 'milliseconds to return a response');
        res.send();
      })
      .catch((err) => { console.error(err); });
  } else {
    return Questions.decrement(
      'rating',
      {
        where: {
          id: questionId,
        }
      })
      .then(() => {
        const end = performance.now();
        console.log('It took', ((end - start)), 'milliseconds to return a response');
        res.send();
      })
      .catch((err) => { console.error(err); });
  }
});

// Finds and sends answers that match criteria
app.get('/api/:questionId/answers', (req, res) => {
  const start = performance.now();
  const { questionId } = req.params;
  const { answer } = req.query;
  const sortBy = [['rating', 'DESC']];

  return Answers.findAll({
    where: {
      questionId,
      answer: {
        [Op.like]: `%${answer}%`,
      },
    },
    order: sortBy,
  })
    .then((results) => {
      const end = performance.now();
      console.log('It took', ((end - start)), 'milliseconds to return a response');
      res.send(results);
    })
    .catch((err) => { console.error(err); });
});

// Increments or decrements rating of an answer
app.patch('/api/answers/:answerId', (req, res) => {
  const start = performance.now();
  const { answerId } = req.params;
  const { vote } = req.query;

  if (vote === 'increment') {

    return Answers.increment(
      'rating',
      {
        where: {
          id: answerId,
        }
      })
      .then(() => {
        const end = performance.now();
        console.log('It took', ((end - start)), 'milliseconds to return a response');
        res.send();
      })
      .catch((err) => { console.error(err); });
  } else {
    return Answers.decrement(
      'rating',
      {
        where: {
          id: answerId,
        }
      })
      .then(() => {
        const end = performance.now();
        console.log('It took', ((end - start)), 'milliseconds to return a response');
        res.send();
      })
      .catch((err) => { console.error(err); });
  }
});

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT);
});