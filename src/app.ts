import * as Koa from 'koa';
import * as Router from 'koa-router';

const DO_REDIRECTS = process.env.DO_REDIRECTS || false;

const HOST_HEADER = 'host';
const PROTOCOL_HEADER = 'x-forwarded-proto';

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
    ctx.body = temporaryTemplate(ctx.request.path);
  }
);

async function redirect(ctx, next) {
  if (!DO_REDIRECTS) {
    return next();
  }

  const host = ctx.headers[HOST_HEADER];
  const protocol = ctx.headers[PROTOCOL_HEADER];
  const path = ctx.path;

  if (!host.includes('www.') || protocol !== 'https') {
    ctx.status = 301;
    ctx.redirect(`https://www.peddecord.photo${path}`);
  } else {
    return next();
  }
}

app
  .use(redirect)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);

console.log('Koa at 3000');
