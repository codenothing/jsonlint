/**
 * JSONLint [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 *
 * Spec for invalid json files
 */
module.exports = {
	'endofarray.json': {
		line: 1,
		character: 9
	},

	'nocomments.json': {
		line: 2,
		character: 2
	},

	'nomulticomment.json': {
		line: 1,
		character: 1
	}
};
