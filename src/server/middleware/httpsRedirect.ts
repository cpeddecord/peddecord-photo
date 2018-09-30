const DO_REDIRECTS = process.env.DO_REDIRECTS || false;

const HOST_HEADER = 'host';
const PROTOCOL_HEADER = 'x-forwarded-proto';
const HEALTH_HEADER = 'x-healthz';

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

export default redirect;
