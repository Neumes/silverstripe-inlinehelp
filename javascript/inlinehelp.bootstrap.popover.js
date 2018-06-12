$(document).ready(function() {
	if(typeof SS_InlineHelpItems !== 'undefined') {
		$.each(SS_InlineHelpItems, function(element,options) {
			options.html = true;
			var pop = $('<button></button>')
				.attr('type', 'button')
				.html('<span class="glyphicon glyphicon-question-sign"></span>')
				.addClass('btn btn-default btn-inlinehelp');
			options.container = $(element).parent();
			pop.popover(options);
			pop.appendTo($(element));
		});
	}
});