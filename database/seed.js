const Question = require('./question.js');
const db = require('./index.js');
const faker = require('faker');
const moment = require('moment');

let answers = [], data = [];

for (var i = 0; i < 10000; i++) {
  answers.push({
    user_id: i,
    user_name: i % 2 === 0 ? faker.name.findName() : faker.internet.userName(),
    created_at: moment(faker.date.past()).format('MMMM Do, YYYY'),
    text: faker.lorem.paragraph(faker.random.number({min: 1, max: 20}))
  });
}

for (var i = 0; i < 100; i++) {
  let randomAnswer = [];
  for (var j = 0; j < faker.random.number({min: 0, max: 200}); j++) {
    randomAnswer.push(answers[faker.random.number({min: 0, max: answers.length})]);
  }
  let question = {
    question_id: i,
    question: faker.lorem.sentence().replace('.', '?'),
    answer: randomAnswer,
    votes: faker.random.number({min: 0, max: 500})
  }
  data.push(question);
}

let insertData = () => {
  Question.create(data)
    .then(() => db.close())
    .catch(err => console.log(err));
};

insertData();