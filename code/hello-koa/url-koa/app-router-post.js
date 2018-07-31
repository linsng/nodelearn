/**
 * 处理post请求参数
 */

 const Koa = require('koa');
 const app = new Koa();

 const router = require('koa-router')();

 /**
  * 使用koa-bodyparser解析post请求的参数
  * 需要引入另一个middleware来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中
  */
 const bodyParser = require('koa-bodyparser');

 router.get('/', async (ctx, next) => {
    console.log(`${ctx.request.method}: ${ctx.request.url}`);
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method=post>
            <p>Name: <input name="name" type="text" value="koa"/> </p>
            <p>Password: <input name="password" type="password"/> </p>
            <p><input type="submit" value="Submit" /></p>
        </form>
    `;
 });

 router.post('/signin', async(ctx, next) => {
    console.log(ctx.request.body);
    var name = ctx.request.body.name || '';
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
 });

// 在router之前添加bodyparser
app.use(bodyParser());
app.use(router.routes());

 app.listen(3000);
 console.log('app started at port 3000...');
