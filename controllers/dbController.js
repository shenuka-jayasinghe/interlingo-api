const express = require('express')
const router = express.Router()

const { User } = require('../models/data-schema')

router.get('/', (req, res) => {
    User.find( (err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log('Erorr in retreiving Employees db :' + JSON.stringify(err, undefined , 2)); }
    })
})