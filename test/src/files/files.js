var fs = require( 'fs' ),
	expect = 0,
	tests = [

		{
			file: 'Numeric.json'
		},

		{
			file: 'comments.json'
		},

		{
			file: 'multi-comment.json'
		},

		{
			file: 'nested.json'
		},

		{
			file: 'pit.json'
		},

		{
			file: 'strings.json'
		},


		{
			file: 'endofarray.json',
			error: true,
			line: 1,
			character: 9
		},

		{
			file: 'nocomments.json',
			error: true,
			line: 2,
			character: 2,
			options: {
				comments: false
			}
		},

		{
			file: 'nomulticomment.json',
			error: true,
			line: 1,
			character: 1,
			options: {
				comments: false
			}
		},

		{
			file: 'string.json',
			error: true,
			line: 2,
			character: 3
		},

		{
			file: 'empty.json',
			error: true,
			line: 1,
			character: 0
		},

		{
			file: 'multi-object.json',
			error: true,
			line: 5,
			character: 1
		}

	];


tests.forEach(function( test ) {
	expect += test.error ? 2 : 1;
});

MUnit( 'Files', expect, function( assert ) {
	tests.forEach(function( test ) {
		fs.readFile( __dirname + '/json/' + test.file, 'utf-8', function( e, contents ) {
			if ( e ) {
				return assert.fail( test.file );
			}

			var lint = JSONLint( contents, test.options );
			if ( ! lint.error ) {
				assert.ok( test.file, ! test.error );
			}
			else if ( ! test.error ) {
				assert.fail( test.file );
			}
			else {
				assert.equal( test.file + '-line', lint.line, test.line );
				assert.equal( test.file + '-character', lint.character, test.character );
			}
		});
	});
});
