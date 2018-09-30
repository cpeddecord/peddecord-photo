import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bunyan from 'bunyan';

const now = require('performance-now');

const DO_REDIRECTS = process.env.DO_REDIRECTS || false;

const HOST_HEADER = 'host';
const PROTOCOL_HEADER = 'x-forwarded-proto';
const HEALTH_HEADER = 'x-healthz';
const TRACE_HEADER = 'X-Cloud-Trace-Context';

const app = new Koa();
const router = new Router();

const logger = bunyan.createLogger({
  name: 'node-app',
});

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
  const path = ctx.path;
  const healthHeader = ctx.headers[HEALTH_HEADER];

  if (!DO_REDIRECTS || healthHeader || path.includes('healthz')) {
    return next();
  }

  const host = ctx.headers[HOST_HEADER];
  const protocol = ctx.headers[PROTOCOL_HEADER];

  if (!host.includes('www.') || protocol !== 'https') {
    ctx.status = 301;
    ctx.redirect(`https://www.peddecord.photo${path}`);
  } else {
    return next();
  }
}

async function requestLogger(ctx, next) {
  if (ctx.path.includes('healthz')) return next();

  const start = now();
  const trace = ctx.headers[TRACE_HEADER];

  const requestLogger = logger.child({
    url: ctx.url,
    method: ctx.method,
    headers: ctx.headers,
    trace,
  });

  ctx.logger = requestLogger;

  await next();

  ctx.logger.info(
    {
      status: ctx.status,
      duration: now() - start,
    },
    'request end'
  );
}

app
  .use(requestLogger)
  .use(redirect)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);

logger.info('Koa at 3000');
