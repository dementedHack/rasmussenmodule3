var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema
var Invoice = require('../models/invoicedoc');

var invoiceItems;

mongoose.Promise = require('bluebird');

/* GET invoice listing. Will respoond with JSON */
router.get('/', function(req, res, next){
	scanForInvoices();
	setTimeout(function(){
		res.json(invoiceItems);
	}, 200);
	
});

// This function will add an invoice to the DB
router.post('/', function(req, res, next){

	var invoiceName = req.body.invoiceName;
	var invoiceCompany = req.body.invoiceCompany;

	var newInvoice = new Invoice;
	newInvoice.company = invoiceCompany;
	newInvoice.name = invoiceName;

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

// Function that scans the db for all items and then pushes the items into an array
function scanForInvoices() {
	Invoice.find(function (err, invoices) {
	  if (err) return console.error(err);
	  invoiceItems = (invoices);
	})
}

module.exports = router;
