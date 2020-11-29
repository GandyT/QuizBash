var games = {};

module.exports = {
    createGame: async function (hostToken, gameId, questions) {
        games[gameId] = {
            hostToken: hostToken,
            hostSocket: undefined,
            players: [],
            started: false,
            answering: false,
            questions: questions,
            round: 0,
        }
    },
    gameExists: function (gameId) {
        return games[gameId] ? true : false;
    },
    hostJoin: function (gameId, token, socket) {
        if (!games[gameId]) return;
        if (games[gameId].hostToken != token) return;
        if (games[gameId].hostSocket) return;

        games[gameId].hostSocket = socket;
        socket.send(JSON.stringify({ op: 200, t: "SUCCESSFUL_CONNECTION" }));
    },
    joinGame: function (gameId, token, socket, username) {
        if (!games[gameId]) return;
        if (games[gameId].players.find(p => p.token == token)) return;
        if (games[gameId].started) return;

        games[gameId].players.push({
            socket: socket,
            username: username,
            token: token,
            choices: [],
            choice: 100,
        });
        games[gameId].hostSocket.send(JSON.stringify({ op: 17, t: "PLAYER_JOIN", username: username }));
        socket.send(JSON.stringify({ op: 200, t: "SUCCESSFUL_CONNECTION" }));
    },
    startGame: function (gameId, hostToken, socket) {
        if (!games[gameId]) return socket.send(JSON.stringify({ op: 405, t: "INVALID_CODE" }));
        if (games[gameId].hostToken != hostToken) returnsocket.send(JSON.stringify({ op: 406, t: "GAME_STARTED" }));

        games[gameId].started = true;
        this.startRound(gameId, hostToken);
    },
    choose: function (gameId, token, choice, socket) {
        if (!games[gameId]) return;
        if (isNaN(choice)) return;
        var player = games[gameId].players.find(p => p.token == token);
        if (!player) return socket.send(JSON.stringify({ op: 402, t: "INVALID_TOKEN" }))
        player.choice = choice;
        games[gameId].hostSocket.send(JSON.stringify({ op: 11, t: "PLAYER_CHOOSE", choice: choice }));
        socket.send(JSON.stringify({ op: 12, t: "FINISHED_CHOOSE" }));
    },
    startRound: function (gameId, hostToken) {
        if (!games[gameId]) return;
        if (games[gameId].hostToken != hostToken) return;
        if (games[gameId].answering) return;

        games[gameId].answering = true;
        games[gameId].players.forEach(p => {
            var payload = {
                op: 5,
                t: "QUESTION",
                question: games[gameId].questions[games[gameId].round].question,
                choices: games[gameId].questions[games[gameId].round].choices
            }
            p.socket.send(JSON.stringify(payload));
        });
    },
    endRound: function (gameId, hostToken) {
        if (!games[gameId]) return;
        if (games[gameId].hostToken != hostToken) return;
        if (!games[gameId].answering) return;

        games[gameId].answering = false;
        games[gameId].players.forEach(p => {
            var payload = {
                op: 6,
                t: "ROUND_END",
            }
            p.socket.send(JSON.stringify(payload));
            p.choices.push(p.choice);
            p.choice = 100;
            return p;
        });
        if (games[gameId].round == games[gameId].questions.length - 1) {
            games[gameId].hostSocket.send(JSON.stringify({ op: 7, t: "GAME_END", players: games[gameId].players }));
            games[gameId].players.forEach(p => {
                var payload = {
                    op: 7,
                    t: "GAME_END",
                }

                p.socket.send(JSON.stringify(payload));
            });
        } else {
            games[gameId].round++;
        }
    },
    purge: function () {
        for (let [key, value] of Object.entries(games)) {
            games[key].players = value.players.filter(p => p.socket.readyState == p.socket.OPEN);
        }
    }
}