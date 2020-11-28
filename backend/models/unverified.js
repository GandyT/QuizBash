const Mongoose = require("mongoose");

const unverified = Mongoose.Schema({
    _id: Mongoose.Schema.Types.ObjectId,
    identifier: String,
    email: String,
    password: String,
    signedUp: Number,
    dob: String,
    username: String,
    firstName: String,
    lastName: String
});

module.exports = Mongoose.model("Unverified", unverified);