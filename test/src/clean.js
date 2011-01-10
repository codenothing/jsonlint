/**
 * JSONLint [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 */
module.exports = [
	// Empties
	"[]",
	"{}",
	"[{}]",
	"[[]]",
	"{\"test\":[]}",
	"{\"test\":{}}",

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

	// String Values (more complex in file sheets)
	"{\"test\":\"good\"}",
	"{\"test\":\"s p a c	i	n	g	\"}",
	"{\"test\":\"'single quote'\"}",
	"{\"test\":\"\\\"double quote\\\"\"}",

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
