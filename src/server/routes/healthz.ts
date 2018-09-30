import { Route } from './types';

const route: Route = [
  '/healthz',
  async (ctx): Promise<any> => {
    ctx.body = '🍞';
  },
];

export default route;
