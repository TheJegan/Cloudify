var mongoose = require('mongoose')

var musicProfileSchema = mongoose.Schema({
    ExternalId: String,
    username: String,
    accountName: String,
    createdDateTime: Date
});


var usersSchema = new mongoose.Schema({
    oauthID: String,
    name: String,
    displayName: String,
    createdBy: String,
    createdDateTime: {
        type: Date,
        default: Date.now
    },
    externalAccountName: String,
    musicProfile: [musicProfileSchema]
});


module.exports = usersSchema;