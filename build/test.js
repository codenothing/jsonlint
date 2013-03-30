global.munit = require( 'munit' );
global.JSONLint = require( '../jsonlint.js' );

munit.render( __dirname + '/../test/', { junit: __dirname + '/results/' } );
