var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema
var Invoice = require('../models/invoicedoc');

var invoiceItems = 0;

mongoose.Promise = require('bluebird');

/* GET users listing. */


function scanForInvoices() {
	Invoice.find(function (err, invoices) {
	  if (err) return console.error(err);
	  invoiceItems = (invoices);
	})
}

module.exports = router;
