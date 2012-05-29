var JSONLint = require('../../jsonlint'),
	Color = require('./color'),
	fs = require('fs');

function Unit( block, specials ) {
	// Argument handling
	this.block = block || [];
	this.specials = specials || {};

	// Focused tests
	this.spec = require('./files/spec');
	this.tests = {
		clean: require('./clean'),
		invalid: require('./invalid')
	};

	// Internals
	this.passes = 0;
	this.errors = 0;
	this.count = 0;

	// Start loading the test sheets
	// while other tests are running
	this.sheets( 'clean' );
	this.sheets( 'invalid' );
	this.focus();
}

Unit.prototype = {

	// Focused tests
	focus: function(){
		var self = this, i, row;

		// Clean simple tests
		self.tests.clean.forEach(function( test, i ) {
			self.clean( "Clean Test[" + i + "]", test );
		});

		// Invalid simple tests
		for ( i in self.tests.invalid ) {
			row = self.tests.invalid[ i ];
			self.invalid( "Invalid Test[" + i + "]", row.json, row.line, row.character );
		}
	},

	// Full sheet testing
	sheets: function( dir ) {
		var self = this, path = __dirname + '/files/' + dir + '/', fin = 0;

		fs.readdir( path, function( e, files ) {
			if ( e ) {
				Color.puts.bold.red( e );
				process.exit( 1 );
			}

			if ( ! files.length ) {
				self.sheets[ dir ] = true;
				self.finished();
			}

			files.forEach(function( file ) {
				// Block insertion
				if ( self.block.indexOf( file ) > -1 ) {
					// Assign finished marking
					if ( ++fin >= files.length ) {
						self.sheets[ dir ] = true;
						self.finished();
					}
					return;
				}

				fs.readFile( path + file, 'utf-8', function( e, data ) {
					if ( e ) {
						Color.puts.bold.red( e );
						process.exit( 1 );
					}

					// Run through JSONLint
					if ( dir == 'clean' ) {
						self.clean( file, data, self.specials[ file ] );
					}
					else if ( self.spec[ file ] ) {
						self.invalid( file, data, self.spec[ file ].line, self.spec[ file ].character, self.specials[ file ] );
					}
					else {
						Color.puts.bold.red( "Invalid files must have a spec entry" );
						process.exit( 1 );
					}

					// Assign finished marking
					if ( ++fin >= files.length ) {
						self.sheets[ dir ] = true;
						self.finished();
					}
				});
			});
		});
	},

	// Clean marking
	clean: function( name, test, options ) {
		this.count++;
		var lint = JSONLint( test, options );

		if ( lint.error ) {
			this.errors++;
			Color.puts.red( "Failed " + name );
			console.log( lint );
		}
		else {
			this.passes++;
			Color.puts.green( "Passed " + name );
		}
	},

	// Invalid marking
	invalid: function( name, test, line, character, options ) {
		this.count++;
		var lint = JSONLint( test, options );

		if ( lint.error ) {
			if ( lint.line === line && lint.character === character ) {
				this.passes++;
				Color.puts.green( "Passed " + name + ", error thrown matches expectations." );
			}
			else {
				this.errors++;
				Color.puts.red( "Failed " + name + ", expecting error on line " + line + ", character " + character );
				console.log( lint );
			}
		}
		else {
			this.errors++;
			Color.puts.red( "Failed " + name + ", didn't throw an error" );
		}
	},

	// Final output
	finished: function(){
		if ( ! this.sheets.clean || ! this.sheets.invalid ) {
			return;
		}

		// Final Report
		if ( this.errors > 0 ) {
			Color.puts.bold.red( "\n\n" + this.errors + " Tests Failed." );
			process.exit( 1 );
		}
		else {
			Color.puts.bold.green( "\n\n All " + this.count + " Tests Passed." );
			process.exit( 0 );
		}
	}

};

// Instance creator
Unit.start = function( block, specials ) {
	return new Unit( block, specials );
};

// Expose for use
module.exports = Unit;
