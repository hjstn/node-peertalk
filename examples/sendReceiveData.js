const port = 2345;

const PeerTalk = require("../index");
const peertalk = new PeerTalk(null, port);

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);


peertalk.then((device) => {
    device.on("data", (data) => {
        console.log(data);
    });

    rl.on("line", (data) => { device.emit("send", data); });
});
