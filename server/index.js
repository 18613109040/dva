require('babel-register');
require('babel-core/register');
require('css-modules-require-hook')({
  generateScopedName: '[local]___[hash:base64:5]',
});
require('./server');
