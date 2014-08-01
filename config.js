var utils = require('./lib/utils');
var config = {};
 
/**
 * Change configuration environment
 * @param  {String} env The environment to change to
 */
var changeEnvironment = function(env){
  if (env == null || !config.hasOwnProperty(env)) env = 'dev';
 
  for (var key in module.exports) delete module.exports[key];
 
  var _config = {};
 
  _config = utils.merge( utils.clone(config.default), config[env] );
 
  for (var key in _config) module.exports[key] = _config[key];
 
  module.exports.env = env;
  
  // Re-export this function since it was overwritten in the environment switch
  module.exports.changeEnvironment = changeEnvironment;
};
 
/**
 * Default Configuration
 * Specific environments will override defaults
 */
config.default = {
  httpPort: process.env.YELLOWSTONE_APP_PORT || 3000
, httpHost: 'localhost'
, isHttps: false
, get baseUrl() {
    return [
      this.isHttps ? 'https://' : 'http://'
    , this.httpHost
    , this.httpPort !== 80 ? (':' + this.httpPort) : ''
    ].join('')
  }
, mediaDir: __dirname + '/public/media'
, mediaPath: '/media'
, mediaExtensions: [
    'jpg', 'jpeg', 'png'
  , 'mov', 'mpg', 'mpeg'
  ]
};
 
/**
 * Test Configuration
 */
config.test = {
  
};
 
/**
 * Dev Configuration
 */
config.dev = {
 
};
 
/**
 * Production Configuration
 */
config.prod = {
  httpHost: 'j0.hn'
};
 
module.exports = {};
 
// Set the initial environment
changeEnvironment( process.env.NODE_ENV || 'dev' );