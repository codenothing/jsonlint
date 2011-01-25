/**
 * JSONLint [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 */
jQuery(function(){
	var textarea = jQuery('textarea').linedtextarea(), wrapper = jQuery('.linedwrap'), results = jQuery('#results'), lint;

	jQuery('button').click(function(){
		wrapper.removeClass('error').removeClass('success');
		results.removeClass('error').removeClass('success');
		lint = JSONLint( textarea.val() );

		if ( ! lint.error ) {
			results.html( 'Valid JSON.' );
			wrapper.addClass('success');
			results.addClass('success');
		}
		else {
			wrapper.addClass('error');
			results.addClass('error');
			results.html([
				lint.error + "<br>" +
				"<b>Line:</b> " + lint.line + "<br>" +
				"<b>Character:</b> " + lint.character
			].join(''));
		}
	});
});
