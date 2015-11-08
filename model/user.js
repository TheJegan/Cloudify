var mongoose = require('mongoose')


var usersSchema = new mongoose.Schema({
    oauthID: String
    ,name: String
    ,displayName: String
    ,createdBy: Number
    ,createdDateTime: { type: Date, default: Date.now }
    ,externalAccountName: String
});


module.exports = usersSchema;