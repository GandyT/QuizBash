/* EXPRESS */
const Express = require("express");
const router = Express.Router();

/* EXTERNAL MODULES */
const Mongoose = require("mongoose");

/* INTERNAL MODULES */
const Random = require("../modules/random.js");

/* MODELS */
const User = require("../models/user.js");
const Quiz = require("../models/quiz.js");

router.post("/", async (req, res) => {
    var args = req.body;

    if (!args.token) return res.send({ success: false, error: "no token provided" });
    if (!args.name) return res.send({ success: false, error: "please provide a name for the quiz" });

    var user = await User.findOne({})
        .populate({
            path: "auth",
            match: { token: args.token },
            select: "name -_id",
        }).exec();
    if (!user) return res.send({ success: false, error: "invalid auth token" });

    var quizId = Random.randomUUID();
    var idExists = await Quiz.findOne({ id: quizId });

    while (idExists) {
        quizId = Random.randomUUID();
        idExists = await Quiz.findOne({ id: quizId });
    }

    var quiz = new Quiz({
        _id: Mongoose.Types.ObjectId(),
        id: quizId,
        name: args.name,
        creatorId: user.id,
        description: args.description || "",
        thumbnailURL: args.thumbnailURL || "",
        questions: [],
    });
    quiz.save();

    user.quizzes.push({ name: quiz.name, id: quiz.id, description: quiz.description, thumbnailURL: quiz.thumbnailURL });
    user.markModified("quizzes");
    user.save();

    return res.send({ success: true, quizId: quizId });
});

module.exports = router;