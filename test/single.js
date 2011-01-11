/**
 * JSONLint [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 */

// Test String (Editable)
var test = '{"test":"\\"double quote\\""}';



// Test Env (Don't Touch)
var JSONLint = require('../jsonlint'), color = require('./src/color');

try {
	JSONLint( test );
	color.puts.green( "Single Test Passed" );
	process.exit( 0 );
} catch ( e ) {
	color.puts.red( "Failed Single Test" );
	e.json = test;
	console.log( e );
	process.exit( 1 );
}
