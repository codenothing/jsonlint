module.exports = {
	// JSON cannot be empty
	"Empty Test": {
		json: "",
		character: 0,
		line: 1
	},

	// There can only be one object/array in a json string
	"Multi Object": {
		json: "{}[]",
		character: 3,
		line: 1
	},

	// Invalid Null Value
	"Capital NULL": {
		json: "{\"test\":NULL}",
		character: 9,
		line: 1
	},

	// Invalid Boolean Value
	"Capital TRUE": {
		json: "{\"test\":TRUE}",
		character: 9,
		line: 1
	},
	"Capital FALSE": {
		json: "{\"test\":FALSE}",
		character: 9,
		line: 1
	},

	// Invalid Numeric Values
	"+1": {
		json: "{\"test\":+1}",
		character: 9,
		line: 1
	},
	"Double Decimal": {
		json: "{\"test\":-101.1.23}",
		character: 15,
		line: 1
	},
	"Non Decimal E": {
		json: "{\"test\":1e}",
		character: 10,
		line: 1
	},
	"Bad E": {
		json: "{\"test\":1.0e}",
		character: 13,
		line: 1
	},
	"Double E": {
		json: "{\"test\":-101.101e1e12}",
		character: 19,
		line: 1
	},
	"Double E negative": {
		json: "{\"test\":101.101e-101e-12}",
		character: 21,
		line: 1
	},
	"E decimal": {
		json: "{\"test\":-101.101E1.102}",
		character: 19,
		line: 1
	},

	// String Values (more complex in file sheets)
	"Bad Close Quote": {
		json: "{\"test\":\"go\"od\"}",
		character: 13,
		line: 1
	},
	"Bad Close Quote with spacing": {
		json: "{\"test\":\"s p a c	\ni	\r\nn	\"g	\"}",
		character: 4,
		line: 4
	},
	"No Close Quote": {
		json: "{\"test\":\"good}",
		character: 14,
		line: 1
	},
	"Invalid Reverse Solidus": {
		json: "[ \"\\s\" ]",
		character: 4,
		line: 1
	},
	"Invalid Reverse Solidus \\u short": {
		json: "[ \"\\u123\" ]",
		character: 4,
		line: 1
	},
	"Invalid Reverse Solidus \\u 1": {
		json: "[ \"\\ua234\" ]",
		character: 4,
		line: 1
	},
	"Invalid Reverse Solidus \\u 2": {
		json: "[ \"\\u1b34\" ]",
		character: 4,
		line: 1
	},
	"Invalid Reverse Solidus \\u 3": {
		json: "[ \"\\u12c4\" ]",
		character: 4,
		line: 1
	},
	"Invalid Reverse Solidus \\u 4": {
		json: "[ \"\\u123d\" ]",
		character: 4,
		line: 1
	},

	// Invalid Brace Notations
	"Bad Closing Array": {
		json: "[null}",
		character: 6,
		line: 1
	},
	"Bad Closing Object": {
		json: "{\"test\":null]",
		character: 13,
		line: 1
	},

	// Multiple Array Values
	"No Comma Array": {
		json: "[ null, true, false, 1, -101,\n101.101E-101 \"stringval\" ]",
		character: 14,
		line: 2
	},
	"No Comma Object": {
		json: "{\n\"test\": null,\n\"ing\": true,\n\"a\": false\n\"b\": -101.101e-101 }",
		character: 1,
		line: 5
	},

	// End of array errors
	"End of Array Error": {
		json: "[ null, ]",
		character: 9,
		line: 1
	},

	// End of object errors
	"End of Object Error": {
		json: "{\"test\": null, }",
		character: 16,
		line: 1
	},

	// End of file Object errors
	"EOF Object Nothing": {
		json: "{\"test\": null",
		character: 13,
		line: 1
	},
	"EOF Object Comma": {
		json: "{\"test\": null,",
		character: 14,
		line: 1
	},
	"EOF Object Space": {
		json: "{\"test\": null ",
		character: 14,
		line: 1
	},
	"EOF Object Array": {
		json: "{\"test\": [ null ]",
		character: 17,
		line: 1
	},

	// End of file Array errors
	"EOF Array Nothing": {
		json: "[ null",
		character: 6,
		line: 1
	},
	"EOF Array Space": {
		json: "[ null ",
		character: 7,
		line: 1
	},
	"EOF Array Comma": {
		json: "[ null,",
		character: 7,
		line: 1
	},
	"EOF Array object": {
		json: "[ null, { \"test\": null } ",
		character: 25,
		line: 1
	}
};
