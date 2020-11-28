/* EXPRESS */
const Express = require("express");
const router = Express.Router();

/* MODELS */
const User = require("../models/user.js");

router.post("/", async (req, res) => {
    const args = req.body;
    var fetchedUser;

    if (args.id) {
        fetchedUser = await User.findOne({
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
    } else if (args.token) {
        fetchedUser = await User.find({})
            .populate({
                path: "auth",
                match: { token: args.token },
                select: "name -_id",
            });
        if (!fetchedUser) return res.send({ success: false, error: "invalid auth token" });

        return res.send({
            success: true, user: {
                username: fetchedUser.username,
                email: fetchedUser.email,
                firstName: fetchedUser.firstName,
                lastName: fetchedUser.lastName,
                id: fetchedUser.id,
                avatarURL: fetchedUser.avatarURL,
                quizzes: fetchedUser.quizzes,
            }
        });
    }

    return res.send({ success: false, error: "please specify user identification" });
})

module.exports = router;