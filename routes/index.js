var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var Schema = mongoose.Schema
var models = {};
var Invoice = require('../models/invoicedoc');

//Promise to avoid errors
var invoiceItems;
var connectionString = "mongodb://mobiledb:GUd0MBA1Cf7XMWdJ6FvCsyCEOZW6W1062pg6V6KhLyPmhveQVhd3YMkq8s2N4BuvecnsH3KKCazGlfLGSUEyBg==@mobiledb.documents.azure.com:10255/?ssl=true";
mongoose.Promise = require('bluebird');

var stack = [];

mongoose.connect(connectionString);
var db = mongoose.connection;

db.once('open', function() {
	console.log('connected to DB successfully');
	scanForInvoices();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  scanForInvoices();
  setTimeout(function(){
  	res.render('index', { title: 'Invoice Scanner', invoiceItems: invoiceItems });  
  }, 200);
  
});

router.post('/', function(req, res, next){

	var invoiceName = req.body.invoiceName;
	var invoiceCompany = req.body.invoiceCompany;

	var newInvoice = new Invoice;
	newInvoice.name = invoiceName;
	newInvoice.company = invoiceCompany;

	newInvoice.save(function(err){
		if(err){
			console.log(err);
		}
		console.log("Item saved to DB");
		console.log(invoiceName);
		console.log(invoiceCompany);

		scanForInvoices();
	})
});

function scanForInvoices() {
	Invoice.find(function (err, invoices) {
	  if (err) return console.error(err);
	  invoiceItems = (invoices);
	})
}

module.exports = router;
