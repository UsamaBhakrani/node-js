// const { John, name } = require("./names");
// const sayHi = require("./utils");

// sayHi("Usama");
// sayHi(John);
// sayHi(name);

const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    return res.end("Hello");
  }
  if (req.url === "/about") {
    return res.end("About Page");
  }
  return res.end("Error");
});

server.listen(8080);
