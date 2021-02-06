const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/questions', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;
// console.log(db)
module.exports = db;