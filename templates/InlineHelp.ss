<% if HelpItems %>

var SS_InlineHelpItems = {
	<% loop $HelpItems %>
		'$DOMPattern' : {
			<% if IconHTML %>icon: '$IconHTML.JS',<% end_if %>
			<% if IconMy && IconAt %>
			iconPosition: {
				<% if IconOffset %>offset: '$IconOffset.JS',<% end_if %>
				my: '$IconMy.JS',
				at: '$IconAt.JS'
			},
			<% end_if %>
			<% if TooltipMy && TooltipAt %>
			tooltipPosition: {
				my: '$TooltipMy.JS',
				at: '$TooltipAt.JS'
			},
			<% end_if %>
			<% if TooltipWidth && TooltipHeight %>
			tooltipSize: {
				width: $TooltipWidth.JS,
				height: $TooltipHeight.JS
			},
			<% end_if %>
			type: '$DisplayType.Lower.JS',
			title: '$Title.JS',
			text: '$Text.JS',
			link: '$Link.JS',
			showOn: '$ShowTooltip.Lower.JS',
			attachWith: '$DOMMethod.JS'
		}
		<% if not $Last %>
		,
		<% end_if %>
	<% end_loop %>
}

$(document).ready(function() {
	$.each(SS_InlineHelpItems, function(k,v) {
		var widget = $(k).inlineHelp(v);
	});
});
<% end_if %>