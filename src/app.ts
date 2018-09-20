import * as Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = `hello world: ${ctx.request.href}`;
});

console.log('Koa at 3000');
app.listen(3000);
