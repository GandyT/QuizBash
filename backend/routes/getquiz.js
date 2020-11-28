/* EXPRESS */
const Express = require("express");
const router = Express.Router();

/* MODELS */
const Quiz = require("../models/quiz.js");

router.post("/", async (req, res) => {
    var args = req.body;
    if (!args.id) return res.send({ success: false, error: "specify quiz id" });

    var quiz = await Quiz.findOne({ id: args.id });
    if (!quiz) return res.send({ success: false, error: "invalid quiz id" });

    res.send({
        success: true, quiz: {
            name: quiz.name,
            creatorId: quiz.creatorId,
            thumbnailURL: quiz.thumbnailURL,
            description: quiz.description,
            questions: quiz.questions
        }
    });
});

module.exports = router;