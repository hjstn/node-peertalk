# node-peertalk
Unofficial PeerTalk module for Node.js

This module allows you to use [PeerTalk by rsms](https://github.com/rsms/peertalk) to communicate with an iOS device through USB, more information is available on the [PeerTalk GitHub repository](https://github.com/rsms/peertalk).

It uses ES6 syntax, which makes it incompatible with older versions of Node.js.

## Install

```
npm install [-g] peertalk
```

Prerequisites: usbmux

## Module Usage

```javascript
const PeerTalk = require("peertalk"),
      peertalk = new PeerTalk();

peertalk.then((device) => {
    // device.emit("send", "PeerTalk message here!");
    // device.on("data", (data) => { // do something });
});

```

## Credits
* [DeMille](https://github.com/DeMille/), for creating [node-usbmux](https://github.com/DeMille/node-usbmux)
* [rsms](https://github.com/rsms/), for creating [PeerTalk](https://github.com/rsms/peertalk)
* [davidahouse](https://github.com/davidahouse/), for creating [peertalk-python](https://github.com/davidahouse/peertalk-python), which was used as reference for creating this project.
...and everyone that had created the modules this project utilizes.