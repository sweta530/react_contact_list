const mongoose = require('mongoose')
require('./connection');

const contactSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    company: String,
    address: String,
    profile_image: String,
});

const Contact = mongoose.model('contacts', contactSchema);

module.exports = Contact