const path = require('path');
const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');

const ctrlHome = require('../controllers/home');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');

router.get('/', ctrlHome.get);
router.post('/', koaBody(), ctrlHome.post);

router.get('/login', ctrlLogin.get);
router.post('/login', koaBody(), ctrlLogin.post);

router.get('/admin', ctrlAdmin.get);
router.post('/admin/skills', koaBody(), ctrlAdmin.postSkills);
router.post(
  '/admin/upload',
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(process.cwd(), 'server', 'public', 'upload'),
    },
  }),
  ctrlAdmin.postUpload
);

module.exports = router;
