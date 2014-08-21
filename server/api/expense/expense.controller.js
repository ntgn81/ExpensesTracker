'use strict';

var _ = require('lodash');
var Expense = require('./expense.model');

function handleError(res, err) {
  return res.send(500, err);
}

// Get list of expenses
exports.index = function(req, res) {
  Expense.find({
    userId: req.user._id
  }, function (err, expenses) {
    if(err) { return handleError(res, err); }
    return res.json(200, expenses);
  });
};

// Get a single expense
exports.show = function(req, res) {
  Expense.findById(req.params.id, function (err, expense) {
    if(err) { return handleError(res, err); }
    if(!expense) { return res.send(404); }
    return res.json(expense);
  });
};

// Creates a new expense in the DB.
exports.create = function(req, res) {
  var expense = new Expense(req.body);
  expense.userId = req.user._id;
  expense.save(function(err, expense) {
    if(err) { return handleError(res, err); }
    return res.json(201, expense);
  });
};

// Updates an existing expense in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Expense.findById(req.params.id, function (err, expense) {
    if (err) { return handleError(res, err); }
    if(!expense) { return res.send(404); }

    _.forOwn(req.body, function(value, key) {
      expense[key] = value;
    });
    expense.date = req.body.date;
    //var updated = _.merge(expense, req.body);
    expense.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, expense);
    });
  });
};

// Deletes a expense from the DB.
exports.destroy = function(req, res) {
  Expense.findById(req.params.id, function (err, expense) {
    if(err) { return handleError(res, err); }
    if(!expense) { return res.send(404); }
    expense.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.getWeeklyExpenses = function(req, res) {
  Expense.aggregate([{
    $match: { userId: req.user._id }
  },{
    $group: {
      _id: "$weekEndDate",
      total: { $sum: "$amount" },
      average:{ $avg: "$amount" }
    }
  }, {
    $sort: {
      _id: -1
  }}], function(err, weeklyExpenses) {
    if(err) { return handleError(res, err); }
    return res.json(200, weeklyExpenses); 
  });
};