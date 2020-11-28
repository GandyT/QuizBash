const Mongoose = require("mongoose");

const user = Mongoose.Schema({
    _id: Mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    dob: String,
    username: String,
    id: String,
    firstName: String,
    lastName: String,
    avatarURL: String,
    quizzes: [Object], // Store Quiz Id's, quiz name, and thumbnailURL, here for lookup in quiz database.
    auth: {
        token: String,
        cookie: String
    }
});

Mongoose.models = {}
module.exports = Mongoose.model("User", user);