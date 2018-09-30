import * as Koa from 'koa';

import logger from './server/logger';
import httpsRedirect from './server/middleware/httpsRedirect';
import loggerMiddleware from './server/middleware/logger';
import axiosMiddleware from './server/middleware/axios';

import router from './server/routes';

const app = new Koa();

app
  .use(loggerMiddleware)
  .use(httpsRedirect)
  .use(axiosMiddleware)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);

logger.info('Koa at 3000');
