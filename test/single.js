// Test String (Editable)
var test = '{"test":"\\"double quote\\""}';



// Test Env (Don't Touch)
var lint = require('../jsonlint')( test ), color = require('./src/color');

if ( lint.error ) {
	color.puts.red( "Failed Single Test" );
	console.log( lint );
	process.exit( 1 );
}
else {
	color.puts.green( "Single Test Passed" );
	process.exit( 0 );
}
