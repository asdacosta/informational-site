const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let parsedPathName = parsedUrl.pathname;
    if (parsedPathName === "/") {
      parsedPathName = "/index.html";
    } else if (parsedPathName === "/about") {
      parsedPathName = "/about.html";
    } else if (parsedPathName === "/contact-me") {
      parsedPathName = "/contact-me.html";
    } else {
      parsedPathName = "/404.html";
    }
    const filePath = "." + parsedPathName;
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
      }

      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
