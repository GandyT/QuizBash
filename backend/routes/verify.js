/* EXPRESS */
const Express = require("express");
const router = Express.Router();

/* EXTERNAL MODULES */
const Mongoose = require("mongoose");

/* INTERNAL MODULES */
const Random = require("../Resource/Modules/Generator.js");

/* MODELS */
const User = require("../Models/User.js");
const Unverified = require("../Models/Unverified.js");

router.get("/", async (req, res) => {
    var currentTime = new Date().getTime();
    var args = req.query;
    var identifier = args["identifier"];

    Unverified.find({}, (err, users) => {
        // Redirect to Failure Page
        if (err) res.direct(`${process.env.DOMAIN}`);

        users.map(user => {
            if (currentTime - user.signedUp >= 900000)
                user.delete();
        });
    });

    if (identifier == null) return res.redirect("http://www.youtube.com/watch?v=dQw4w9WgXcQ");
    if (typeof identifier != "string") return res.redirect("http://www.youtube.com/watch?v=dQw4w9WgXcQ");
    var identifierExists = Unverified.exists({ identifier: identifier });
    if (!identifierExists) return res.redirect(`${process.env.DOMAIN}/verify/fail`);

    var dataTable = await Unverified.findOne({ identifier: Identifier });
    var email = Datatable.Email;
    var password = Datatable.Password;
    var userID = Random.randomUUID();
    var userExists = await User.exists({ id: userID });
    while (userExists) {
        userID = Random.randomUUID();
        userExists = await User.exists({ id: userID });
    }

    const newUser = new User({
        _id: Mongoose.Types.ObjectId(),
        email: email,
        password: password,
        dob: dataTable.dob,
        username: dataTable.username,
        id: userID,
        firstName: dataTable.firstName,
        lastName: dataTable.lastName,
        avatarURL: "",
        auth: {
            token: "",
            expires: "",
            cookie: ""
        }
    });

    newUser.save();

    dataTable.delete();

    // Redirect to Success Page

    return res.redirect(`${process.env.DOMAIN}/verify/success`);
});

module.exports = router;