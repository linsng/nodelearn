 const Koa = require('koa');
 const app = new Koa();

 const bodyParser = require('koa-bodyparser');

 // 导入controller middleware:
 const controller = require('./controller');

 app.use(bodyParser());
 app.use(controller());

 app.listen(3000);
 console.log('app started at port 3000...');