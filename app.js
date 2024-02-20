// const Logger = require("./logger");
// const logger = new Logger();
const http = require("node:http");

// logger.on("Logged Message", (e) => {
//   console.log("Message is:", e);
// });

// logger.log("Message");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});
server.listen(8080);

console.log("Listening on port 8080");
