/*
* server
*/

const http = require('http');
const formBody = require('body/form');
const crack = require('./crack');

const handler = (req, res) => {
  formBody(req, res, (err, body) => {
    res.writeHead(200, { 'Content-type': 'application/json' });
    const promise = err ? Promise.reject(err) : crack({
      groundDataString: body.ground,
      brickDataString: body.brick,
      brickTop: parseFloat(body.top, 10),
    });
    promise.then((result) => {
      res.end(JSON.stringify(result));
    }).catch((error) => {
      res.end(JSON.stringify({ Error: error }));
    });
  });
};

module.exports = {
  create: () => (
    http.createServer(handler)
  ),
};
