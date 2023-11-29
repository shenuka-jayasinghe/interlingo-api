const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/interlingo-test', {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB server');
});

module.exports = mongoose
