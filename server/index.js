const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 1337;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT);
});