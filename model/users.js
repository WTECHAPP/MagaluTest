var mongoose = require('../db');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
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

const User = mongoose.model('users', UserSchema);
module.exports = User;