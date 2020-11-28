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
    quizzes: [String], // Store Quiz Id's here for lookup in quiz database.
    auth: {
        token: String,
        cookie: String
    }
});

module.exports = Mongoose.model("User", user);