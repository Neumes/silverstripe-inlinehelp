$(document).ready(function() {
	$.each(SS_InlineHelpItems, function(element,options) {
		options.html = true;
		var pop = $('<button></button>')
			.text('?')
			.addClass('btn btn-default btn-inlinehelp');
		pop.popover(options);	
		pop.appendTo($(element));
	});
});