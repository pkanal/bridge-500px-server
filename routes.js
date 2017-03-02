const Router = require('koa-router');
const firebase = require('./firebase.js');
const state = require('./state.js');
const R = require('ramda');

const router = new Router();

router.get('/api/photos/:photoId/comments', ctx => {
  ctx.body = R.filter(comment => comment.photoId.toString() === ctx.params.photoId, state.get('comments'));
});

router.post('/api/photos/:photoId/comments', ctx => {
  const photoId = ctx.params.photoId;
  const { username, text } = ctx.request.body;
  if (!username || !text) {
    ctx.body = 'Invalid JSON posted';
    ctx.status = 400;
  } else {
    ctx.status = 200;
    ctx.body = firebase.addComment({ photoId, username, text });
  }
});

module.exports = router;
