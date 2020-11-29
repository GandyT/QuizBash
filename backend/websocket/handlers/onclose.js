const SManager = require("../socketmanager.js");

const onclose = async function () {
    SManager.purge();
}

module.exports = onclose;