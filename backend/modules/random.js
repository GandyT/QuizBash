module.exports = {
    ["randomString"]: () => {
        var str = "";
        var set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < 16; ++i)
            str += set[Math.floor(Math.random() * set.length)]
        return str;
    },
    ["randomUUID"]: () => {
        const s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    }
}