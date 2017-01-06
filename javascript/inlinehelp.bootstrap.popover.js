$(document).ready(function() {
	$.each(SS_InlineHelpItems, function(element,options) {
		options.html = true;
		var pop = $('<button></button>')
			.html('<span class="glyphicon glyphicon-question-sign"></span>')
			.addClass('btn btn-default btn-inlinehelp');
		pop.popover(options);	
		pop.appendTo($(element));
	});
});