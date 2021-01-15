const Question = require('./question.js');
const db = require('./index.js');
const faker = require('faker');
const moment = require('moment');

let answers = [], data = [];

for (var i = 0; i < 10000; i++) {
  answers.push({
    _id: i,
    username: i % 2 === 0 ? faker.name.findName() : faker.internet.userName(),
    createdAt: moment(faker.date.past()).format('MMMM Do, YYYY'),
    text: faker.lorem.paragraph(faker.random.number({min: 1, max: 20}))
  });
}

for (var i = 0; i < 100; i++) {
  let randomAnswer = [], votes = faker.random.number({min: 0, max: 500});
  for (var j = 0; j < faker.random.number({min: votes / 2, max: votes}); j++) {
    randomAnswer.push(answers[faker.random.number({min: 0, max: answers.length})]);
  }

  let question = {
    _id: i,
    question: faker.lorem.sentence().replace('.', '?'),
    answer: randomAnswer,
    votes: votes
  }

  data.push(question);
}

let insertData = () => {
  Question.create(data)
    .then(() => db.close())
    .catch(err => console.log(err));
};

insertData();