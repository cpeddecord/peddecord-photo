import * as Koa from 'koa';
import * as Router from 'koa-router';

const now = require('performance-now');

const DO_REDIRECTS = process.env.DO_REDIRECTS || false;

const HOST_HEADER = 'host';
const PROTOCOL_HEADER = 'x-forwarded-proto';
const HEALTH_HEADER = 'x-healthz';

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
  const healthHeader = ctx.headers[HEALTH_HEADER];
  if (!DO_REDIRECTS || healthHeader) {
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

// TODO: get some bunyan up in hrrr
async function logger(ctx, next) {
  console.log('request start', {
    method: ctx.method,
    url: ctx.url,
  });

  const start = now();

  await next();

  console.log('request end', {
    method: ctx.method,
    url: ctx.url,
    duration: now() - start,
  });
}

app
  .use(logger)
  .use(redirect)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);

console.log('Koa at 3000');
