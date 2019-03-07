const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const Pug = require('koa-pug');
const serve = require('koa-static');
const session = require('koa-session');
const flash = require('koa-connect-flash');
require('dotenv').config();
const router = require('./routes');

const app = new Koa();
const pug = new Pug({
  viewPath: path.resolve(__dirname, 'views'),
  app: app,
});

app.use(serve(path.resolve(__dirname, 'public')));
app.use(flash());

app.use(
  session(
    {
      secret: process.env.SESSION_SECRET_KEY,
      key: 'sessionkey',
      maxAge: 86400000,
      overwrite: true,
      httpOnly: true,
      signed: false,
      rolling: false,
      renew: false,
    },
    app
  )
);

app.use(router.routes());

const port = process.env.PORT || 3000;
app.listen(port, function() {
  const upload = path.join(process.cwd(), 'server', 'public', 'upload');
  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }
  console.log(`Example app listening on port ${port}!`);
});
