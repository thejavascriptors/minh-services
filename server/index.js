const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const port = 1337;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server');
});

app.listen(port, (req, res) => {
  console.log('App listening from port ' + port);
});