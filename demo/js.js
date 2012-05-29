jQuery(function(){
	var textarea = jQuery('textarea').linedtextarea(),
		wrapper = jQuery('.linedwrap'),
		results = jQuery('#results'),
		comments = jQuery('input[type=checkbox]')[ 0 ],
		lint;

	jQuery('button').click(function(){
		wrapper.removeClass('error').removeClass('success');
		results.removeClass('error').removeClass('success');
		lint = JSONLint( textarea.val(), { comments: comments.checked } );

		if ( ! lint.error ) {
			wrapper.addClass('success');
			results.addClass('success').html( 'Valid JSON.' );
		}
		else {
			wrapper.addClass('error');
			results.addClass('error').html([
				lint.error + "<br>" +
				"<b>Evidence:</b> " + lint.evidence + "<br>" +
				"<b>Line:</b> " + lint.line + "<br>" +
				"<b>Character:</b> " + lint.character
			].join(''));
		}
	});
});
