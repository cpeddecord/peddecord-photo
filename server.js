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
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const server = express();

global.PUBLIC_PATH = path.resolve(__dirname, 'public');

const loggerFormat = ':remote-addr [:date[web]] :method :url :status :res[content-length] :response-time ms'
const accessLogStream = fs.createWriteStream(PUBLIC_PATH + `/access-${new Date().toISOString().slice(0, 10)}.log`, {flags: 'a'})
const logger = morgan(loggerFormat, {
  stream: accessLogStream
});

server.use(compression());

// Short-circuit the browser's annoying favicon request. You can still
// specify one as long as it doesn't have this exact name and path.
server.get('/favicon.ico', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'image/x-icon' });
  res.end();
});

server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(express.static(PUBLIC_PATH));

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

/**
 * API SERVER STUFFS
 */

 const apicache = require('apicache').options({
   debug: isDeveloping
 }).middleware;

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

if (isDeveloping) {
  server.use(cors());
} else {
  server.use(cors(corsOptions));
}

server.use('/api', apicache('24 hours'), require('./api'));

server.use(logger);
server.get('*', require('./app').serverMiddleware);

server.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('📷  @ %s. Wow. Very %s.', port, process.env.NODE_ENV || 'development');
});
