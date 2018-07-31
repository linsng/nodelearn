// koa middleware async函数处理链

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const app = new Koa();


/**
 * middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序。
 */
app.use(async (ctx, next) => {
    console.log(ctx.request.method + ': ' + ctx.url);
    await next();
    console.log('url end');
});

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    console.log('ms');
    await next();
    const ms = new Date().getTime() - start;
    console.log(`Time: ${ms}ms`);
});

app.use(async (ctx, next) => {
    console.log('我先处理..');
    await next();
    console.log('我后处理..');
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2.</h1>';
});

app.listen(3000);