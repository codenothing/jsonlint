module.exports = [
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
