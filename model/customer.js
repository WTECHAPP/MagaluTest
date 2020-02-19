var mongoose = require('../db');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        }
    }, 
    { 
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

const Customer = mongoose.model('customers', CustomerSchema);
module.exports = Customer;