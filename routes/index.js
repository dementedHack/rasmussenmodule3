var express = require('express');
var router = express.Router();
// insert tedious driver 


var async = require('async');

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var models = {};
var Invoice = require('../models/invoicedoc');

//Promise to avoid errors
var invoiceItems = [];

var stack = [];

// Create connection to database
var config = {
  userName: 'kai', // update me
  password: 'Keepitreal20', // update me
  server: 'rasmussenmodule3dbserver.database.windows.net', // update me
  options: {
      database: 'module3DB', //update me
      encrypt: true
  }
}
var connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log(err)
    }
    else{
        console.log('connected to DB successfully');
        //queryDatabase();
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  invoiceItems = [];
  queryDatabase();
  setTimeout(function(){
  	res.render('index', { title: 'Sample App', invoiceItems: invoiceItems });  
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

function queryDatabase(){
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
    	// Query only returns a few fields
        "SELECT TOP 10 FirstName, LastName, CompanyName FROM SalesLT.Customer",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
        }
    );

    request.on('row', function(columns) {
        var item = {};
        columns.forEach(function(column) {
            //console.log("%s\t%s", column.metadata.colName, column.value);
            item[column.metadata.colName] = column.value; 
        });
            console.log(item);
            invoiceItems.push(item);
            console.log("------------------");
    });
    connection.execSql(request);
}