import * as Router from 'koa-router';

import { forEach } from 'lodash';

import healthz from './healthz';
import test from './test';
import temporary from './temporary';

const router = new Router();

const routes = {
  get: [healthz, test, temporary],
};

forEach(routes, (subRoutes, method) => {
  forEach(subRoutes, (r) => {
    router[method](...r);
  });
});

export default router;
