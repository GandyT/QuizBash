/* EXPRESS */
const Express = require("express");
const router = Express.Router();

/* MODELS */
const User = require("../models/user.js");

router.post("/", async (req, res) => {
    const args = req.body;

    if (!args.id) return res.send({ success: false, error: "please specify a user id" });

    var fetchedUser = await User.findOne({
        id: args.id,
    });

    if (!fetchedUser) return res.send({ success: false, error: "invalid user id" });

    return res.send({
        success: true, user: {
            username: fetchedUser.username,
            id: fetchedUser.id,
            avatarURL: fetchedUser.avatarURL,
            quizzes: fetchedUser.quizzes,
        }
    });
})

module.exports = router;