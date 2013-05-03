global.munit = require( 'munit' );
global.JSONLint = require( '../jsonlint.js' );

// Only stop test suite when running make test
if ( ! process.env.NODE_TEST_NO_SKIP ) {
	munit.defaults.settings.stopOnFail = true;
}

munit.render( __dirname + '/../test/', {
	junit: __dirname + '/results/',
	junitPrefix: process.version.replace( /\./g, '_' )
});
