const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Question = require('../database/question.js');
const app = express();

const port = 1337;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/api/questions', (req, res) => {
  Question.find()
    .then(data => res.send(data))
    .catch(err => console.error(err));
});

app.patch('/api/questions/:id/question', (req, res) => {
  let id = req.params.id.slice(1);
  let vote = req.body.data;
  Question.findOneAndUpdate({_id: Number(id)}, {$inc: {votes: vote}}, {new: true})
    .then(data => res.end(JSON.stringify(data)))
    .catch(err => console.error(err));
});

app.listen(port, (req, res) => {
  console.log('App listening from port ' + port);
});