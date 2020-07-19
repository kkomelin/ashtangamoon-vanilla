'use strict';

const restify = require('restify');
const { moonPhases } = require('./src/moonPhases');

function respond(req, res, next) {
  const result = moonPhases(); 

  res.send(result);
  next();
}

var server = restify.createServer();
server.get('/api/moon-phases', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
