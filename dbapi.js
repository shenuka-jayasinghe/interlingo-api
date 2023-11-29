const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db.js');
var employeeController = require('./controllers/dbController.js')  


var app = express();
app.use(bodyParser.json());

app.listen(3001, () => console.log('Server started at port : 3001'));