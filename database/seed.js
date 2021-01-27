const Question = require('./question.js');
const db = require('./index.js');
const faker = require('faker');
const moment = require('moment');

let answers = [], data = [];
let keywords = [
  'PS5', 'XBOX', 'controller', 'steam', 'playstation', 'console', 'games', 'joystick', 'configuration',
  'order', 'money', 'system', 'expensive', 'cheap', 'wireless', 'connection', 'light', 'battery', 'life', 'compatible', 'video', 'please help me'
];

for (var i = 0; i < 10000; i++) {
  let word = keywords[faker.random.number({min: 0, max: keywords.length -1})];
  let para = faker.lorem.paragraph(faker.random.number({min: 1, max: 10}));
  if (Math.random() > 0.99) {
    let sentence = para.split('.');
    let random = faker.random.number({min: 0, max: sentence.length - 1});
    let words = sentence[random].split(' ');
    let rand = faker.random.number({min: 1, max: words.length - 1});
    words[rand] = word;
    sentence[random] = words.join(' ');
    para = sentence.join('.');
  }

  answers.push({
    _id: i,
    username: i % 2 === 0 ? faker.name.findName() : faker.internet.userName(),
    createdAt: moment(faker.date.past()).format('MMMM Do, YYYY'),
    text: para
  });
}

for (var i = 0; i < 100; i++) {
  let randomAnswer = [], votes = faker.random.number({min: 0, max: 250});
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