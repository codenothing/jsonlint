/**
 * JSONLint [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 */
jQuery(function(){
	var textarea = jQuery('textarea').linedtextarea(), wrapper = jQuery('.linedwrap'), results = jQuery('#results');

	jQuery('button').click(function(){
		wrapper.removeClass('error').removeClass('success');
		results.removeClass('error').removeClass('success');
		try {
			JSONLint( textarea.val() );
			results.html( 'Valid JSON.' );
			wrapper.addClass('success');
			results.addClass('success');
		} catch ( e ) {
			wrapper.addClass('error');
			results.addClass('error');
			results.html([
				e.message + "<br>" +
				"<b>Line:</b> " + e.line + "<br>" +
				"<b>Character:</b> " + e.character
			].join(''));
		}
	});
});
