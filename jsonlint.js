/**
 * JSONLint [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 */
(function( glob, undefined ) {

var rnumber = /[0-9]/,
	rnewline = /(\r\n|\r|\n)/,
	revidence = /\r\n|\r|\n/,
	rwhitespace = /(\s|\t)/,
	rvalidsolidus = /\\("|\\|\/|b|f|n|r|t|u[0-9]{4})/,
	rE = /^(\-|\+)?[0-9]/;


// Leeeeeeerrrrroooyy Jennkkkiiinnnss
function JSONLint( json, options ) {
	if ( ! ( this instanceof JSONLint ) ) {
		return new JSONLint( json, options );
	}

	// Argument handling
	this.json = json || '';
	this.options = options || {};
	this.lower = this.json.toLowerCase();

	// Allow comments by default
	if ( ! this.options.hasOwnProperty( 'comments' ) ) {
		this.options.comments = true;
	}

	// Internals
	this.c = '';
	this.i = -1;
	this.length = this.json.length;
	this.line = 1;
	this.character = 0;
	this._evidence = this.json.split( revidence );
	this.endblock = '';
	this.commabreak = false;

	try {
		this.render();
	} catch ( e ) {
		if ( typeof e != 'string' ) {
			throw e;
		}
		this.error = e;
		this.setEvidence();
	}
}


// Meta (Please change contact info for republishing with changes)
JSONLint.contact = "Corey Hart (corey@codenothing.com)";
JSONLint.version = '[VERSION]';
JSONLint.date = '[DATE]';


// Methods
JSONLint.prototype = {

	// Rendering Start
	render: function(){
		for ( var peek = '', content = false; ++this.i < this.length; ) {
			this.c = this.json[ this.i ];
			this.character++;

			if ( this.options.comments && this.c == '/' ) {
				peek = this.json[ this.i + 1 ];
				if ( peek == '*' ) {
					this.multicomment();
				}
				else if ( peek == '/' ) {
					this.comment();
				}
				else {
					throw "Unknown character '/', maybe a comment?";
				}
			}
			else if ( rnewline.exec( this.c ) ) {
				this.line++;
				this.character = 0;
			}
			else if ( rwhitespace.exec( this.c ) ) {
				continue;
			}
			else if ( content ) {
				throw "Unknown character '" + this.c + "', expecting end of file.";
			}
			else if ( this.c == '[' ) {
				content = true;
				this.array();
			}
			else if ( this.c == '{' ) {
				content = true;
				this.object();
			}
			else {
				throw "Unknown character '" + this.c + "', expecting opening block '{' or '[', or maybe a comment";
			}
		}

		// Check for pure whitespace
		if ( ! content ) {
			throw "Invalid JSON, no content.";
		}
	},

	// Multi line comment
	multicomment: function(){
		for ( ; ++this.i < this.length; ) {
			this.c = this.json[ this.i ];
			this.character++;

			if ( this.c == "*" && this.json[ this.i + 1 ] == "/" ) {
				this.i++;
				this.character++;
				break;
			}
			else if ( rnewline.exec( this.c ) ) {
				this.line++;
				this.character = 0;
			}
		}
	},

	// Single line comment
	comment: function(){
		for ( ; ++this.i < this.length; ) {
			this.c = this.json[ this.i ];
			this.character++;

			if ( rnewline.exec( this.c ) ) {
				this.line++;
				this.character = 0;
				break;
			}
		}
	},

	// Array Block
	array: function(){
		// Keep reference of current endblock
		var _endblock = this.endblock, _commabreak = this.commabreak, ended = false;
		this.endblock = ']';
		this.commabreak = false;
		while ( ( ended = this.value() ) !== true && this.i < this.length ) {
			// Do nothing, just wait for array values to finish
		}

		if ( ! ended ) {
			throw "EOF Error. Expecting closing ']'";
		}

		// Reset previous endblock
		this.endblock = _endblock;
		this.commabreak = _commabreak;
	},

	// Object Block
	object: function(){
		// Keep reference of current endblock
		var _endblock = this.endblock, _commabreak = this.commabreak, found = false, peek = '', empty = true;
		this.endblock = '}';
		this.commabreak = false;
		for ( ; ++this.i < this.length; ) {
			this.c = this.json[ this.i ];
			this.character++;

			if ( this.options.comments && this.c == '/' ) {
				peek = this.json[ this.i + 1 ];
				if ( peek == '*' ) {
					this.multicomment();
				}
				else if ( peek == '/' ) {
					this.comment();
				}
				else {
					throw "Unknown character '/', maybe a comment?";
				}
			}
			else if ( rnewline.exec( this.c ) ) {
				this.line++;
				this.character = 0;
			}
			else if ( rwhitespace.exec( this.c ) ) {
				continue;
			}
			else if ( this.c == '"' ) {
				empty = false;
				if ( this.key() === true ) {
					// Reset old endblock
					this.endblock = _endblock;
					this.commabreak = _commabreak;
					found = true;
					break;
				}
			}
			else if ( empty && this.c == '}' ) {
				this.endblock = _endblock;
				this.commabreak = _commabreak;
				found = true;
				break;
			}
			else {
				throw "Unknown Character '" + this.c + "', expecting a string for key statement.";
			}
		}

		if ( ! found ) {
			throw "EOF Error, expecting closing '}'.";
		}
	},

	// Key Statement
	key: function(){
		this.string();
		for ( var peek = ''; ++this.i < this.length; ) {
			this.c = this.json[ this.i ];
			this.character++;

			if ( this.options.comments && this.c == '/' ) {
				peek = this.json[ this.i + 1 ];
				if ( peek == '*' ) {
					this.multicomment();
				}
				else if ( peek == '/' ) {
					this.comment();
				}
				else {
					throw "Unknown character '/', maybe a comment?";
				}
			}
			else if ( rnewline.exec( this.c ) ) {
				this.line++;
				this.character = 0;
			}
			else if ( rwhitespace.exec( this.c ) ) {
				continue;
			}
			else if ( this.c == ":" ) {
				return this.value();
			}
			else {
				throw "Unknown Character '" + this.c + "', expecting a semicolon.";
			}
		}
	},

	// Value statement
	value: function(){
		for ( var peek = ''; ++this.i < this.length; ) {
			this.c = this.json[ this.i ];
			this.character++;

			if ( this.options.comments && this.c == '/' ) {
				peek = this.json[ this.i + 1 ];
				if ( peek == '*' ) {
					this.multicomment();
				}
				else if ( peek == '/' ) {
					this.comment();
				}
				else {
					throw "Unknown character '/', maybe a comment?";
				}
			}
			else if ( rnewline.exec( this.c ) ) {
				this.line++;
				this.character = 0;
			}
			else if ( rwhitespace.exec( this.c ) ) {
				continue;
			}
			else if ( this.c == '{' ) {
				this.object();
				return this.endval();
			}
			else if ( this.c == '[' ) {
				this.array();
				return this.endval();
			}
			else if ( this.c == '"' ) {
				this.string();
				return this.endval();
			}
			else if ( this.json.indexOf( 'true', this.i ) === this.i ) {
				this.i += 3;
				this.character += 3;
				return this.endval();
			}
			else if ( this.json.indexOf( 'false', this.i ) === this.i ) {
				this.i += 4;
				this.character += 4;
				return this.endval();
			}
			else if ( this.json.indexOf( 'null', this.i ) === this.i ) {
				this.i += 3;
				this.character += 3;
				return this.endval();
			}
			else if ( this.c == '-' || rnumber.exec( this.c ) ) {
				return this.numeric();
			}
			else if ( this.c == ']' && this.endblock == ']' ) {
				if ( this.commabreak ) {
					throw "Unexpected End Of Array Error. Expecting a value statement.";
				}
				return true;
			}
			else {
				throw "Unknown Character '" + this.c + "', expecting a value.";
			}
		}
	},

	// String statement
	string: function(){
		for ( var found = false, m; ++this.i < this.length; ) {
			this.c = this.json[ this.i ];
			this.character++;

			if ( this.c == "\\" ) {
				if ( ( m = rvalidsolidus.exec( this.json.substr( this.i ) ) ) && m.index === 0 ) {
					this.i += m[ 1 ].length;
					this.character += m[ 1 ].length;
				}
				else {
					throw "Invalid Reverse Solidus '\\' declaration.";
				}
			}
			else if ( rnewline.exec( this.c ) ) {
				this.line++;
				this.character = 0;
			}
			else if ( this.c == '"' ) {
				found = true;
				break;
			}
		}

		// Make sure close string is found
		if ( ! found ) {
			throw "EOF: No close string '\"' found.";
		}
	},

	// Numeric Value
	numeric: function(){
		var negative = true,
			decimal = null,
			e = null,
			peek = '';

		// We need to jump back a character to catch the whole number
		this.i--;
		this.character--;
		for ( ; ++this.i < this.length; ) {
			this.c = this.json[ this.i ];
			this.character++;

			// Handle initial negative sign
			if ( negative ) {
				negative = false;
				if ( this.c == '-' ) {
					if ( ! rnumber.exec( this.json[ this.i + 1 ] ) ) {
						throw "Unknown Character '" + this.c + "' following a negative, expecting a numeric value.";
					}
					continue;
				}
			}

			// Only a single decimal is allowed in a numeric value
			if ( decimal && this.c == '.' ) {
				decimal = false;
				e = true;
				continue;
			}
			// Only a single e notation is allowed in a numeric value
			else if ( e && this.c.toLowerCase() == 'e' ) {
				e = false;
				negative = true;
				if ( rE.exec( this.json.substr( this.i + 1, 2 ) ) ) {
					this.character++;
					this.i++;
				}
				else {
					this.character++;
					throw "Unknown Character '" + this.json[ this.i + 1 ] + "' following e notation, expecting a numeric value.";
				}
			}
			// Normal Digit
			else if ( rnumber.exec( this.c ) ) {
				if ( decimal === null ) {
					decimal = true;
				}
			}
			// Assume end of number, and allow endval to handle it
			else {
				// Jump back a character to include the current one
				this.i--;
				this.character--;
				return this.endval();
			}
		}
	},

	// Ending a value statement
	endval: function(){
		this.commabreak = false;
		for ( var peek = ''; ++this.i < this.length; ) {
			this.c = this.json[ this.i ];
			this.character++;

			if ( this.options.comments && this.c == '/' ) {
				peek = this.json[ this.i + 1 ];
				if ( peek == '*' ) {
					this.multicomment();
				}
				else if ( peek == '/' ) {
					this.comment();
				}
				else {
					throw "Unknown character '/', maybe a comment?";
				}
			}
			else if ( rnewline.exec( this.c ) ) {
				this.line++;
				this.character = 0;
			}
			else if ( rwhitespace.exec( this.c ) ) {
				continue;
			}
			else if ( this.c == ',' ) {
				this.commabreak = true;
				break;
			}
			else if ( this.c == this.endblock ) {
				return true;
			}
			else {
				throw "Unknown Character '" + this.c + "', expecting a comma or a closing '" + this.endblock + "'";
			}
		}
	},

	// Expose line of the error
	setEvidence: function(){
		var start = this.line - 5, end = start + 8, evidence = '';

		// Min start
		if ( start < 0 ) {
			start = 0;
			end = 8;
		}

		// Max end
		if ( end >= this._evidence.length ) {
			end = this._evidence.length;
		}

		// Evidence display
		for ( ; start < end; start++ ) {
			evidence += ( start === ( this.line - 1 ) ? "-> " : "   " ) +
				( start + 1 ) + '| ' +
				this._evidence[ start ] + "\n";
		}

		// Set the evidence display
		this.evidence = evidence;
	}
};


// Expose to Nodelint system if possible
if ( typeof Nodelint != 'undefined' ) {
	Nodelint.Linters.add({

		// Config
		name: 'jsonlint',
		display: 'JSONLint',
		linter: JSONLint,
		build: __filename,
		match: /\.json$/i,

		// Meta
		version: JSONLint.version,
		date: JSONLint.date,
		contact: JSONLint.contact

	}, function( JSONLint, file, content, options ) {
		// Run JSON file through linter
		var result = JSONLint( content, options );

		// JSONLint only stops on every error, so create a single entry array from it
		return result.error ? [ result ] : [];
	});
}
// Check for nodejs module system
else if ( typeof exports == 'object' && typeof module == 'object' ) {
	module.exports = JSONLint;
}
// In a browser
else {
	glob.JSONLint = JSONLint;
}

})( this );
