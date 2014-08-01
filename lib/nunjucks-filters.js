/**
 * Nunjucks filters
 */

var media     = require('./media');
var nfilters  = module.exports = [];

nfilters.push( function( nenv ){
  nenv.addFilter( 'extension', function( file ){
    if ( typeof file !== 'string' ) return '';
    return file.slice( file.lastIndexOf('.') + 1 );
  });
});