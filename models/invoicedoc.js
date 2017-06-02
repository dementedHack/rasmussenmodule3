// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var InvoiceSchema   = new mongoose.Schema({
  name: String,
  company: String
});

// Export the Mongoose model
module.exports = mongoose.model('Invoice', InvoiceSchema);