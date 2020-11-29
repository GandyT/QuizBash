const SManager = require("../socketmanager.js");
const User = require("../../models/user.js");

const onmessage = async function (payload) {
    var socket = this;
    var data = JSON.parse(payload);
    var op = data.op;

    if (!data.token) return socket.send(JSON.stringify({ op: 400, t: "SEND_TOKEN" }));

    if (!data.gameId) return socket.send(JSON.stringify({ op: 401, t: "NO_GAME_ID" }));

    if (op == 1) {
        // Host Connect
        SManager.hostJoin(data.gameId, data.token, socket);
    } else if (op == 2) {
        // Player Connect
        var player = await User.findOne({})
            .populate({
                path: "auth",
                match: { token: data.token },
                select: "name -_id",
            }).exec();
        if (!player) return socket.send(JSON.stringify({ op: 402, t: "INVALID_TOKEN" }));
        SManager.joinGame(data.gameId, data.token, socket, player.username);
    } else if (op == 3) {
        // Player Choose
        if (!data.choice && data.choice !== 0) return socket.send(JSON.stringify({ op: 403, t: "NO_CHOICE" }));
        SManager.choose(data.gameId, data.token, data.choice, socket);
    } else if (op == 4) {
        // Teacher Start Game
        SManager.startGame(data.gameId, data.token, socket);
    } else if (op == 8) {
        // Teacher Start Round
        SManager.startRound(data.gameId, data.token);
    } else if (op == 9) {
        // Teacher End Round
        SManager.endRound(data.gameId, data.token);
    }
}

module.exports = onmessage;