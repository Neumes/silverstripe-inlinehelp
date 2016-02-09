;(function($) {
	$(document).on('ready', function() {
		$('#AttachType').find(':checked').change();
		$('#DisplayType').find(':checked').change();
	});

	$('#AttachType :radio').on('change', function() {
		switch ($(this).val()) {
			case 'All':
				$('#Form_ItemEditForm_ParentFilterID_Holder').hide();
				$('#Form_ItemEditForm_Pages_Holder').hide();
				$('#Form_ItemEditForm_AttachPageType_Holder').hide();
				break;

			case 'Pages':
				$('#Form_ItemEditForm_ParentFilterID_Holder').hide();
				$('#Form_ItemEditForm_Pages_Holder').show();
				$('#Form_ItemEditForm_AttachPageType_Holder').hide();
				break;

			case 'Children':
				$('#Form_ItemEditForm_ParentFilterID_Holder').show();
				$('#Form_ItemEditForm_Pages_Holder').hide();
				$('#Form_ItemEditForm_AttachPageType_Holder').hide();
				break;

			case 'Type':
				$('#Form_ItemEditForm_ParentFilterID_Holder').hide();
				$('#Form_ItemEditForm_Pages_Holder').hide();
				$('#Form_ItemEditForm_AttachPageType_Holder').show();
				break;
		}
	});

	$('#DisplayType :radio').on('change', function() {
		switch ($(this).val()) {
			case 'Tooltip':
				$('#Form_ItemEditForm_Text.htmleditor').show();
				break;

			case 'Link':
				$('#Form_ItemEditForm_Text.htmleditor').hide();
				break;
		}
	});
})(jQuery);