const utf8 = require("utf8");
const events = require("events");
const usbmux = require("usbmux");
const bufferpack = require("bufferpack");

function PeerTalk(options, port) {
    if(!port || typeof port !== "number") port = "2345";

    return new Promise((resolve, reject) => {
        const event = new events.EventEmitter();

        usbmux.getTunnel(port, options).then((tunnel) => {
            resolve(event);

            event.on("send", (msg) => {
                const enc = utf8.encode(msg),
            	packed_data = bufferpack.pack("! I I I I", [1,101,0,enc.length+4]),
            	packed_message = bufferpack.pack(`! I ${enc.length}s`, [enc.length, enc]);

            	tunnel.write(packed_data);
            	tunnel.write(packed_message);
            });

        	tunnel.on("data", (data) => {
        		const size = bufferpack.unpack("! I I I I", data)[3];
        		const msg = data.slice(data.length - size).toString();
                event.emit("data", msg);
        	});
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = PeerTalk;
