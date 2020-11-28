/* EXPRRESS */
const Express = require("express");
const router = Express.Router();

/* MODELS */
const User = require("../models/user.js");
const Quiz = require("../models/quiz.js");

router.post("/", async (req, res) => {
    var args = req.body;

    if (!)
        if (!args.id) return res.send({ success: false, error: "please specify a quiz id" });
    if (!args.name) return res.send({ success: false, error: "please specify a quiz name" });
    if (!args.description) return res.send({ success: false, error: "please specify a description" });
    if (!args.thumbnailURL) return res.send({ success: false, error: "please specify a thumbnailURL" });
    if (!args.questions) return res.send({ success: false, error: "please quiz questeions" });

    var quiz = await Quiz.findOne({ id: args.id });
    if (!quiz) return res.send({ success: false, error: "invalid quiz id" });

    var user = await User.findOne({})
        .populate({
            path: "auth",
            match: { token: args.token },
            select: "name -_id",
        });
    if (!user) return res.send({ success: false, error: "invalid auth token" });
    if (user.id != quiz.creatorId) return res.send({ success: false, error: "you are not the creator of this quiz" });

    quiz.name = args.name;
    quiz.description = args.description;
    quiz.thumbnailURL = args.thumbnailURL;
    quiz.questions = args.questions;

    quiz.save();

    return res.send({ success: true });
});

module.exports = router;