const Mongoose = require("mongoose");

const quiz = Mongoose.Schema({
    _id: Mongoose.Schema.Types.ObjectId,
    id: String,
    name: String,
    creatorId: String,
    description: String,
    thumbnailURL: String,
    questions: [Object],
});

module.exports = Mongoose.model("Quiz", quiz);