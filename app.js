const http = require('http');
const fs = require('fs');
// const urlParser = require('url');

const server = http.createServer((req, res) => {
  const url = req.url;
  res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
  // const url2 = urlParser.parse(req.url, true);

  if (url === '/test') {
    res.end('Teste Route');
  } else {
    fs.access(__dirname + url, (err) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain; charset=UTF-8'});
        res.end('File Not Found');
      } else {
        fs.readFile(__dirname + url, (err, data) => {
          if (err) {
            throw err;
          }

          res.end(data);
        });
      }
    });
  }
});

server.listen(3000);