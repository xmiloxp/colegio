const env = process.env.NODE_ENV;
if (env === 'production' || env === 'demo' || env === 'stag') {
    module.exports = require('./configureStore.prod');

  } else {
    module.exports = require('./configureStore.dev');
  }