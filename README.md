JSONLint is a JSON Linter that allows for comments in your JSON Files.

Usage
-----

	var lint = JSONLint( json );
	if ( lint.error ) {
		// Do something with the error
		lint.error // Error Message
		lint.line; // Line number in json file where error was found
		lint.character; // Character of line in json file where error was found
	}

JSONLint takes two arguemnts, and throws an error if found.

 - *string* **json**: JSON String to be linted

 - *object* **options**: Object of options.


Options
-------

There is currently only 1 option that is handled: **comments**, which defaults to true if not set.
