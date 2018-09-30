import * as bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'node-app',
});

export default logger;
