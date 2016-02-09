<?php
/**
 * @package silverstripe-inlinehelp
 */

/**
 * Set up a simplified HTML editor config for use in help text.
 */
HtmlEditorConfig::get('helpsimple')->setOptions(array(
	'friendly_name'	    => 'Simple',
	'language'          => i18n::get_tinymce_lang(),
	'document_base_url' => Director::absoluteBaseURL(),
	'mode'              => 'specific_textareas',
	'valid_elements'    => '*[*]'
));
HtmlEditorConfig::get('helpsimple')->setButtonsForLine(1, array(
	'bold', 'italic', 'underline', 'strikethrough', 'separator', 'undo',
	'redo', 'separator', 'formatselect', 'cleanup', 'separator',
	'bullist', 'numlist'
));
HtmlEditorConfig::get('helpsimple')->setButtonsForLine(2);
HtmlEditorConfig::get('helpsimple')->setButtonsForLine(3);