/**
 * Media Module
 */

var fs      = require('fs');
var url     = require('url');
var utils   = require('./utils');
var config  = require('../config');

var media  = module.exports = {};

media.list = function( options, callback ){
  if ( typeof options === 'function' ){
    callback = options;
    options = null;
  }

  options = utils.defaults( options || {}, {

  });

  fs.readdir( config.mediaDir, function( error, files ){
    if ( error ) return callback( error );

    callback( null, files.filter( function( p ){
      return config.mediaExtensions.indexOf( p.slice(-3) ) > -1;
    }).map( function( p ){
      return {
        href: [ config.baseUrl, config.mediaPath, p ].join('/')
      };
    }));
  });
};