<% if HelpItems %>
var SS_InlineHelpItems = {
	<% loop $HelpItems %>
		'$DOMPattern' : {
			type: '$DisplayType.Lower.JS',
			title: '$Title.JS',
			content: '$Text.JS',
			link: '$Link.JS',
			trigger: '$trigger',
			<% if $container %>container: '$container',<% end_if %>
			<% if $html %>html: '$html',<% end_if %>
			placement: 'auto $placement',
			container: 'body'
		}<% if not $Last %>,<% end_if %>
	<% end_loop %>
}
<% end_if %>