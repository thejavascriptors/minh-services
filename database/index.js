const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/questions', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = db;