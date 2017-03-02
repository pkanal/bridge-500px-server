const R = require('ramda');

let state = {
  comments: [],
  apiKeys: [],
};

state.set = (key, value) => {
  state = R.assoc(key, value, state);
  console.log(JSON.stringify(state, '\t'));
};

state.get = key => R.prop(key, state);

module.exports = state;
