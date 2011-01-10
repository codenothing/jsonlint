/**
 * JSONLint [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 */

// Test String (Editable)
var test = "{\"test\":1.0e1}";



// Test Env (Don't Touch)
var JSONLint = require('../jsonlint'), color = require('./src/color');

try {
	JSONLint( test );
	color.puts.green( "Single Test Passed" );
	process.exit( 0 );
} catch ( e ) {
	color.puts.red( "Failed Single Test" );
	console.log( e );
	process.exit( 1 );
}
