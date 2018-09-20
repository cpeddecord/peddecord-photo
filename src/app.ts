import * as Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  console.log(ctx.request.href);
  ctx.body = 'hello world';
});

console.log('Koa at 3000');
app.listen(3000);
