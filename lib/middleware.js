var config  = require('../config');
var utils   = require('./utils');

var m = module.exports = {};

m.config = function( options ){
  options = options || {};

  return function( req, res, next ){
    res.locals.config = config;
    next();
  };
}