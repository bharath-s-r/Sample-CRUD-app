const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        customerid: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        lastlogin: {
            type: String,
            required: true
        },
        balance:{
            type: String,
            required: true
        },

        transaction: {
            type: Array,
            required: String
        }
    },
    
);

module.exports = mongoose.model('Customer', customerSchema);