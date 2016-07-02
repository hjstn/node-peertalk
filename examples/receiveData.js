const port = 2345;

const PeerTalk = require("../index");
const peertalk = new PeerTalk(port);

peertalk.then((device) => {
    device.on("data", (data) => {
        device.emit("send", "Got it!");
    });
});