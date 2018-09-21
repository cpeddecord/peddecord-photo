import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa();
const router = new Router();

const temporaryTemplate = (s: string): string => {
  return `<!DOCTYPE html><html><head><meta name="google-site-verification" content="LIA0G4bJQIQGiM8VX3vHKIJf_yRMiG8TQqQKRPkkJ2g" /></head><body>hello world: ${s}</body></html>`;
};

router.get(
  '/healthz',
  async (ctx): Promise<any> => {
    ctx.body = '🍞';
  }
);

router.get(
  '/*',
  async (ctx): Promise<any> => {
    console.log(ctx.request.headers);
    ctx.body = temporaryTemplate(ctx.request.href);
  }
);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);

console.log('Koa at 3000');
