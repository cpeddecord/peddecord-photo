require('babel-core/register');

require.extensions['.scss'] = function() {
  return;
};

const fs = require('fs');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const morgan = require('morgan');
const cors = require('cors');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const server = express();

global.PUBLIC_PATH = path.resolve(__dirname, 'public');

server.use(morgan('tiny'));


// Short-circuit the browser's annoying favicon request. You can still
// specify one as long as it doesn't have this exact name and path.
server.get('/favicon.ico', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'image/x-icon' });
  res.end();
});

server.use(express.static(path.resolve(__dirname, 'dist')));

if (isDeveloping) {
  const compiler = webpack(config);

  server.use(webpackMiddleware(compiler, {
    publicpath: config.output.publicpath,
    watch: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  server.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr'
  }));
}

// The client has access to the same global `CONFIG` variable.
const envConfigPath = './app/config/' + (process.env.NODE_ENV || 'local');
global.CONFIG = require(envConfigPath).default;


server.get('*', require('./app').serverMiddleware);

server.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('📷  @ %s. Wow.', port);
});


const whitelist = [
  'http://peddecordphoto.com',
  'http://peddecordphoto.com:8080',
  'http://162.243.159.23',
  'http://162.243.159.23:8080',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
];

const corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

const apiServer = express();
apiServer.use(morgan('tiny'));
apiServer.use(cors(corsOptions));
apiServer.use(express.static(PUBLIC_PATH));
apiServer.use('/api', require('./api'));

apiServer.listen(9000, 'localhost', function onStart (err) {
  if (err)
    console.log(err);

  console.info('🙏  API listening on port %s.', 9000);
});
