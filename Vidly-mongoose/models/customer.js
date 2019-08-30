const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const customerSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
      },
    phone: {
        type: String,
        required: true,
        minlength: 7, 
        maxlength: 15,
        match: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    }
})

const Customer = mongoose.model('Customer', customerSchema); //compile the schema to a class

function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
  }

  exports.Customer = Customer;
  exports.validate = validateCustomer;