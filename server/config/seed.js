/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Expense = require('../api/expense/expense.model');
var User = require('../api/user/user.model');

function createExpenses(userId) {
  Expense.find({}).remove(function() {
    Expense.create({
      userId: userId,
      date: '20140818',
      time: '2300',
      description: 'One hour ago',
      amount: 5.22,
      comment: 'Comment #1'
    },{
      userId: userId,
      date: '20140718',
      time: '2200',
      description: 'Two hour ago',
      amount: 5.22,
      comment: 'Comment #2'
    },{
      userId: userId,
      date: '20140618',
      time: '2100',
      description: 'Three hour ago',
      amount: 5.22,
      comment: 'Comment #3'
    },{
      userId: userId,
      date: '20140418',
      time: '2000',
      description: 'Four hour ago',
      amount: 5.22,
      comment: 'Comment #4'
    },{
      userId: userId,
      date: '20140417',
      time: '1900',
      description: 'Five hour ago',
      amount: 5.22,
      comment: 'Comment #5'
    },{
      userId: userId,
      date: '20140416',
      time: '1800',
      description: 'Six hour ago',
      amount: 5.22,
      comment: 'Comment #6'
    },function (err, res) {
      console.log('error craeting expenses', err);
    });
  });  
}

User.find({}).remove(function() {
  User.create({
    email: 't',
    password: 't'
  }, {
    email: 'test@test.com',
    password: 'test'
  }, {
    email: 'admin@admin.com',
    password: 'admin'
  }, function(err, user) {
      console.log('finished populating users');
      createExpenses(user._id);
    }
  );
});