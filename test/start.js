/**
 * JSONLint [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 */

// Temporary files to block during rendering
var block = [
];

// Special options for certain files
var specials = {
	'nocomments.json': {
		comments: false
	},
	'nomulticomment.json': {
		comments: false
	}
};

require('./src/core').start( block, specials );
