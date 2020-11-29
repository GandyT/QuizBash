/**EXPRESS  / */
const Express = require("express");
const router = Express.Router();

/* MODELS */
const User = require("../models/user.js");
const Quiz = require("../models/quiz.js");
const SManager = require("../websocket/socketmanager.js");

router.post("/", async (req, res) => {
    var args = req.body;
    if (!args.token) return res.send({ success: false, error: "please specify a token" });
    if (!args.quizId) return res.send({ success: false, error: "please specify a quizId" });

    var user = await User.find({})
        .populate({
            path: "auth",
            match: { token: args.token },
            select: "name -_id",
        });
    if (!user) return res.send({ success: false, error: "invalid auth token" });
    var quiz = await Quiz.findOne({
        id: args.quizId
    });
    if (!quiz) return res.send({ success: false, error: "invalid quiz id" });

    var gameId = Math.floor(Math.random() * 999999);
    while (SManager.gameExists(gameId)) {
        gameId = Math.floor(Math.random() * 999999);
    }

    SManager.createGame(args.token, gameId, quiz.questions);
    return res.send({ success: true, gameId: gameId, questions: quiz.questions });
});

module.exports = router;