const utf8 = require("utf8");
const events = require("events");
const usbmux = require("usbmux");
const bufferpack = require("bufferpack");

function PeerTalk(options, port) {
    if(!port || typeof port !== "number") port = "2345";
        const event = new events.EventEmitter();

        return usbmux.getTunnel(port, options).then((tunnel) => {
            event.on("send", (msg) => {
                msg = utf8.encode(msg);
                tunnel.write(bufferpack.pack("! I I I I", [1,101,0,msg.length+4]));
                tunnel.write(bufferpack.pack(`! I ${msg.length}s`, [msg.length, msg]));
            });

            tunnel.on("data", (data) => {
                const size = bufferpack.unpack("! I I I I", data)[3];
                event.emit("data", data.slice(data.length - size).toString());
            });

            return event;
        });
}

module.exports = PeerTalk;
