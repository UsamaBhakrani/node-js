const EventEmitter = require("node:events");

const Logger = require("./logger");
const logger = new Logger();

logger.on("Logged Message", (e) => {
  console.log("Message is:", e);
});

logger.log("Message");
