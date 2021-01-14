const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/questions', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;

module.exports = db;