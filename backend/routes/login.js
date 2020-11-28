/* EXPRESS */
const Express = require("express");
const router = Express.Router();

/* INTERNAL MODULES */
const Random = require("../modules/random.js");

/* MODELS */
const User = require("../Models/User.js");

/* VARIABLES */
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

router.post("/", async (req, res) => {
    var args = req.body;

    var email = args["email"];
    var password = args["password"];

    if (!email) return res.send({ success: false, error: "Enter an email" });
    if (!password) return res.send({ success: false, error: "Enter a password" });

    if (typeof email != "string") return res.send({ success: false, error: "email must be a string" });
    if (typeof password != "string") return res.send({ success: false, error: "password must be a string" });

    email = email.toLowerCase();

    // error checks for users being apes
    if (email.match(emailRegEx) == null) return res.send({ success: false, error: "Invalid email" });

    var userData = await User.findOne({ email: email });
    if (!userData) return res.send({ success: false, error: "An Account with this email does not exist" });

    if (userData.password != password) return res.send({ success: false, error: "Invalid password" });

    var accToken = Random.randomUUID();
    var authTokenExists = await User.find({})
        .populate({
            path: "auth",
            match: { token: accToken },
            select: "name -_id",
        })
    while (authTokenExists) {
        accToken = Random.randomUUID();
        authTokenExists = await User.find({})
            .populate({
                path: "auth",
                match: { token: accToken },
                select: "name -_id",
            });
    }
    var cookie = Random.randomUUID();
    var cookieExists = await User.find({})
        .populate({
            path: "auth",
            match: { cookie: cookie },
            select: "name -_id",
        });
    while (cookieExists) {
        cookie = Random.RandomUUID();
        cookieExists = await User.find({})
            .populate({
                path: "auth",
                match: { cookie: cookie },
                select: "name -_id",
            });
    }

    userData.auth = {};
    userData.auth.token = AccToken;
    userData.auth.cookie = cookie;
    userData.markModified("auth");
    userData.save();

    res.cookie("QUIZBASH", cookie);
    return res.send({ success: true, token: accToken })
});

module.exports = router;