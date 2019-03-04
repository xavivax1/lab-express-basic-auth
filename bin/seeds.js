'use strict';

const User = require('../models/User');
const mongoose = require('mongoose');

const userData = [
  {
    username: 'aaaaaaaa',
    password: 'aaaaaaaa'
  },
  {
    username: 'xavi',
    password: 'xavi'
  },
  {
    username: 'aeiou',
    password: 'aeiou'
  }
];

mongoose.connect('mongodb://localhost/basicauth', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

User.insertMany(userData)
  .then(result => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(error);
  });
