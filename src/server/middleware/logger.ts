import logger from '../logger';
const now = require('performance-now');

const TRACE_HEADER = 'x-cloud-trace-context';

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

export default requestLogger;
