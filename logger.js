const EventEmitter = require("node:events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("Logged Message", {
      orderId: 2,
      company: "Cure9",
      item: "Curexil",
    });
  }
}

module.exports = Logger;
