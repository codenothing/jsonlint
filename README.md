[![NPM version](https://badge.fury.io/js/jsonlint.png)](http://badge.fury.io/js/jsonlint) ![Test Runner](https://github.com/codenothing/jsonlint/actions/workflows/main.yml/badge.svg) [![Code Climate](https://codeclimate.com/github/codenothing/jsonlint.png)](https://codeclimate.com/github/codenothing/jsonlint)

#JSONLint

JSONLint is a JSON Linter that allows for comments in your JSON Files.

## Installation

For use with NodeJS, use NPM

```bash
$ npm install -g json-lint
```

For use in browser environments, include the script tag

```html
<script type="text/javascript" src="jsonlint.js"></script>
```

## Usage

```js
// Require it for NodeJS environment
var JSONLint = require("json-lint");

// Run the JSON string through the linter
var lint = JSONLint(json, options);

// Do something with the error
if (lint.error) {
  lint.error; // Error Message
  lint.line; // Line number in json file where error was found
  lint.character; // Character of line in json file where error was found
}
```

JSONLint takes two arguments, and throws an error if found.

- _string_ **json**: JSON String to be linted

- _object_ **options**: Object of options.

## Options

There is currently only 1 option that is handled: **comments**, which defaults to true if not set.
