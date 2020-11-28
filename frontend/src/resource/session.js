var session = {
    token: undefined,
}

var Session = {
    getToken: () => {
        return session.token;
    },
    setToken: token => {
        session.token = token;
    }
}

export default Session;