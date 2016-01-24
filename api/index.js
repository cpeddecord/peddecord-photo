var fs = require('fs');
var path = require('path');
var router = require('express').Router();

var dirTree = require('./directory-tree');
var dirCereal = require('./directory-serialize');

router.get('*/:resource', function (request, response) {
  var requestPath = PUBLIC_PATH + '/' + request.params.resource;

  try {
    dirTree(requestPath, dirTreeToSerialize);
  } catch (e) {
    console.error(e);
    response.status(400).send('please stop');
  }

  function dirTreeToSerialize (err, payload) {
    try {
      dirCereal(payload, `http://${request.headers.host}/${request.params.resource}`, sendRes);
    } catch (e) {
      response.status(400).send('“Here I am, brain the size of a planet and they ask me to take you down to the bridge. Call that job satisfaction? ‘Cos I don’t.”');
    }
  }

  function sendRes (err, payload) {
    if (err) throw(err);
    response.json(payload)
  }
});

module.exports = router;
