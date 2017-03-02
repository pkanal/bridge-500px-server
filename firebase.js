const admin = require('firebase-admin');
const serviceAccount = require('./firebaseInit.json');
const state = require('./state.js');

const helpers = require('./helpers.js');

const firebaseUrl = 'https://bridge-photo-map-f2a84.firebaseio.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseUrl,
});

const db = admin.database();

const commentsRef = db.ref('/comments');
const commentsPushRef = commentsRef.push();

commentsRef.on('value', data => {
  state.set('comments', helpers.fbToArray(data.val()));
});

const addComment = ({ photoId, username, text }) => {
  commentsPushRef.set({
    photoId,
    username,
    text,
  });

  return {
    username,
    photoId,
    id: commentsPushRef.key,
    text,
  };
};

module.exports = {
  addComment,
};
