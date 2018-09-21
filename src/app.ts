import * as Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  console.log(ctx.request.headers);
  ctx.body = `<!DOCTYPE html><html><head><meta name="google-site-verification" content="LIA0G4bJQIQGiM8VX3vHKIJf_yRMiG8TQqQKRPkkJ2g" /></head><body>hello world: ${
    ctx.request.href
  }</body></html>`;
});

console.log('Koa at 3000');
app.listen(3000);
