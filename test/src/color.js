var sys = require('sys'),
	Color = module.exports = function( color, bold, str ) {
		return "\x1B[" + ( bold ? 1 : 0 ) + ";" + Color.colors[ color ] + "m" + str + "\x1B[0m";
	};

// Color references
Color.colors = {
	red: 31,
	green: 32,
	yellow: 33,
	blue: 34
};

// Bold object
Color.bold = {};
Color.puts = { bold: {} };


// Iteration mimic hack
(function( obj, fn ) {
	for ( var i in obj ) {
		fn.call( obj[ i ], obj[ i ], i );
	}
})( Color.colors, function( value, color ) {
	// Normal color
	Color[ color ] = function( msg ) {
		return Color( color, false, msg );
	};

	// Bolded color
	Color.bold[ color ] = function( msg ) {
		return Color( color, true, msg );
	};

	// Auto output of normal color
	Color.puts[ color ] = function( msg ) {
		return sys.puts( Color( color, false, msg ) );
	};

	// Auto output of bold color
	Color.puts.bold[ color ] = function( msg ) {
		return sys.puts( Color( color, true, msg ) );
	};
});
