/* EXPRESS */
const Express = require("express");
const router = Express.Router();

/* EXTERNAL MODULES */
const Mongoose = require("mongoose");
const NodeMailer = require("nodemailer");

/* INTERNAL MODULES */
const Random = require("../modules/random.js");

/* DATABASE */
const User = require("../models/user.js");
const Unverified = require("../models/unverified.js");

/* VARIABLES */
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailTransport = NodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

/* REQUEST MANAGER */
router.post("/", async (req, res) => {
    var currentTime = new Date().getTime();
    var args = req.body;

    var email = args["email"];
    var password = args["password"];
    var verifyPswd = args["cpassword"];
    var dob = args["dob"];
    var username = args["username"];
    var firstName = args["firstname"];
    var lastName = args["lastname"];

    if (!username) return res.send({ success: false, error: "Please enter a username" });
    if (!email) return res.send({ success: false, error: "Please enter a valid email address." });
    if (!firstName) return res.send({ success: false, error: "Please enter your first name" });
    if (!lastName) return res.send({ success: false, error: "Please enter your last name" });
    if (!dob) return res.send({ success: false, error: "Please enter your age" });
    if (!password) return res.send({ success: false, error: "Please enter a password" });
    if (!verifyPswd) return res.send({ success: false, error: "Please confirm your password" });

    if (typeof email != "string") return res.send({ success: false, error: "Please enter a valid email address" });
    if (typeof password != "string") return res.send({ success: false, error: "Please enter a valid password" });
    if (typeof verifyPswd != "string") return res.send({ success: false, error: "Please confirm your password." });

    email = email.toLowerCase();

    // More Error Checks
    if (email.match(emailRegEx) == null) return res.send({ success: false, error: "Invalid Email Address" });
    if (password.length < 8) return res.send({ success: false, error: "Password must be atleast 8 characters." });
    if (password.length > 100) return res.send({ success: false, error: "Max password length is 100 characters" });
    if (password != VerifyPswd) return res.send({ success: false, error: "The password and the confirmation password are not the same." });

    // Email Exists Already
    var emailExists = await User.exists({ email: email });
    if (emailExists) return res.send({ success: false, error: "An account with this email exists already." });
    var unverifiedExists = await Unverified.exists({ email: email });
    if (unverifiedExists) return res.send({ success: false, error: "A registration has been made with this email already." });

    // Generate Identifiers
    var verIdentifier = Random.randomString();
    var identifyExists = await Unverified.exists({ identifier: verIdentifier });

    while (identifyExists) {
        verIdentifier = Generator.RandomString(512, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
        identifyExists = await Unverified.exists({ Identifier: VerIdentifier });
    }

    var unverifiedUser = new Unverified({
        _id: Mongoose.Types.ObjectId(),
        identifier: verIdentifier,
        email: email,
        password: password,
        signedUp: currentTime,
        dob: dob,
        username: username,
        firstName: firstName,
        lastName: lastName
    });
    unverifiedUser.save();

    // Deletes users who did not verify and the time to verify ran out
    unverified.find({}, (err, Users) => {
        if (err) throw err;

        Users.map(user => {
            if (currentTime - user.signedUp >= 900000)
                user.delete();
        });
    });

    // request email verification
    try {
        await emailTransport.sendMail({
            from: "\"QuizBash\" <noreply@quizbash.com>",
            to: email,
            subject: "Email Verification",
            html: `<p>
				<b>Please click this link to verify your email</b><br>
				<a href="${process.env.DOMAIN}/api/verify?identifier=${verIdentifier}">
					Verify Account
				</a><br><br>
				<b>Verification Link will expire in 15 minutes</b>
			</p>`
        });
    } catch { }

    // send success res
    return res.status(200).send({ success: true });
});

module.exports = router;