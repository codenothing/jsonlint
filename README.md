JSONLint is a JSON Linter that allows for comments in your JSON Files.

Usage
-----

	try {
		JSONLint( json );
	} catch ( e ) {
		// Do something with the error
		e.line; // Line number in json file where error was found
		e.character; // Character of line in json file where error was found
	}

JSONLint takes two arguemnts, and throws an error if found.

 - *string* **json**: JSON String to be linted

 - *object* **options**: Object of options.


Options
-------

There is currently only 1 option that is handled: **comments**, which defaults to true if not set.
