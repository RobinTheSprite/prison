var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Person = require('../models/Person');

router.get('/person', function(req, res, next) {
    Person.find()
      .then(Person => {
        res.json({
          confirmation: 'success',
          data: Person
        })
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          message: err.message
        })
      })
});

module.exports = router;
