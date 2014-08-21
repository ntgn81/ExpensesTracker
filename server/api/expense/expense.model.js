'use strict';

var mongoose = require('mongoose'),
  moment = require('moment'),  
  Schema = mongoose.Schema;

var dateFormat = 'YYYYMMDD';

var ExpenseSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  weekEndDate: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
    set: function(date) {
      this.weekEndDate = moment(date, dateFormat).endOf('week').format(dateFormat);
      
      return date;
    }
  },
  time: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  comment: String
});

/**
 * Validations
 */
ExpenseSchema.path('date').validate(function (v) {
  return moment(v, dateFormat).isValid();
}, 'Date must be of format YYYYMMDD');

ExpenseSchema.path('time').validate(function (v) {
  return moment(v, 'HHmm').isValid();
}, 'Time must be of format HHmm');

ExpenseSchema.path('amount').validate(function (v) {
  return typeof v === 'number' && v > 0;
}, 'Amount must be a positive number');

module.exports = mongoose.model('Expense', ExpenseSchema);