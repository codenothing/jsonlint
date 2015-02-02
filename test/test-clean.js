var tests = [
	// Empties
	"[]",
	"{}",
	"[{}]",
	"[[]]",
	"{\"test\":[]}",
	"{\"test\":{}}",
	"{\"test\": [ ], \"test2\": [ ] }",

	// Null Value
	"{\"test\":null}",

	// Boolean Values
	"{\"test\":true}",
	"{\"test\":false}",

	// Numeric Values
	"{\"test\":1}",
	"{\"test\":-101}",
	"{\"test\":101.101}",
	"{\"test\":-101.101e1}",
	"{\"test\":101.101e-101}",
	"{\"test\":-101.101E1}",
	"{\"test\":101.101E-101}",
	"{\"test\":101.101e+101}",
	"{\"test\":101.101E+101}",

	// String Values
	"[\"\"]",
	"{\"test\":\"good\"}",
	"{\"test\":\"s p a c	i	n	g	\"}",
	"{\"test\":\"'single quote'\"}",
	"{\"test\":\"\\\"double quote\\\"\"}",
	"{\"test\":\"unicode values \\u1234\"}",
	"{\"test\":\"unicode values \\u00a9\"}",

	// Valid Reverse solidus in strings
	"[\"\\\"\"]",
	"[\"\\\\\"]",
	"[\"\\/\"]",
	"[\"\\b\"]",
	"[\"\\f\"]",
	"[\"\\n\"]",
	"[\"\\r\"]",
	"[\"\\t\"]",
	"[\"\\u1234\"]",
	"[\"\\u00a9\"]",

	// Array Value
	"{\"test\": [ true ] }",

	// Array
	"[null]",
	"[true]",
	"[false]",
	"[1]",
	"[-101]",
	"[101.101E-101]",
	"[\"stringval\"]",

	// Multi Array
	"[ null, true, false, 1, -101, 101.101E-101, \"stringval\" ]",

	// Multi Object
	"{ \"test\": null, \"ing\": true, \"a\": false, \"b\": -101.101e-101 }"
];

munit( 'Clean', tests.length, function( assert ) {
	tests.forEach(function( test, index ) {
		var lint = JSONLint( test );

		assert.ok( index + '', ! lint.error );
	});
});
