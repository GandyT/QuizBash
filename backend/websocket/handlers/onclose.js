const SManager = require("../socketmanager.js");

const onclose = async () => {
    SManager.purge();
}