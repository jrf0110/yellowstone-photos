var express   = require('express');
var nunjucks  = require('nunjucks');
var config    = require('./config');
var media     = require('./lib/media');
var m         = require('./lib/middleware');
var nfilters  = require('./lib/nunjucks-filters');
var app       = express();

var nenv = nunjucks.configure( 'views', {
  autoescape: true
, express:    app
});

nfilters.forEach( function( nfilter ){
  nfilter( nenv );
});

app.use( m.config() );

if ( config.env === 'dev' ){
  app.use( express.static( __dirname + '/public' ) );
}

app.get( '/', function( req, res ){
  res.locals.test = 'ya!'
  media.list( function( error, media ){
    res.locals.error = error;
    res.locals.media = media;
    res.render('index.html');
  });
});

app.listen( config.httpPort );