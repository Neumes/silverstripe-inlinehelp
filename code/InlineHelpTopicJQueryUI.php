<?php

/**
 * InlineHelpTopicJQueryUI
 *
 * @author Stephen McMahon <stephen@silverstripe.com.au>
 */
class InlineHelpTopicJQueryUI extends DataExtension {

	private static $db = array(
		'TooltipWidth' => 'Varchar(6)',
		'TooltipHeight' => 'Varchar(6)',
		'IconHTML' => 'HTMLVarchar(255)',
		'IconMy' => 'Varchar(15)',
		'IconAt' => 'Varchar(15)',
		'IconOffset' => 'Varchar(10)',
		'TooltipMy' => 'Varchar(15)',
		'TooltipAt' => 'Varchar(15)',
	);
	
	public function updateCMSFields(FieldList $fields) {
		$fields->add(
			new Tab('Advanced',
				new HeaderField('AdvancedHeader', 'Advanced Inline Help Options'),
				new DropdownField('ShowTooltip', 'Show tooltip on', array(
					'Hover' => 'On mouse hover',
					'Click' => 'On mouse click'
				)),
				new TextField('IconHTML', 'Icon HTML code'),
				new FieldGroup('Help icon position (relative to subject)',
					new TextField('IconMy', 'my'),
					new TextField('IconAt', 'at')
				),
				new FieldGroup('Help icon offset (relative to position)',
					new TextField('IconOffset', ''),
					new LiteralField('IconOffsetNote',
						'format "horizontal vertical" (e.g. "15 -5")')
				),
				new FieldGroup('Tooltip position (relative to icon)',
					new TextField('TooltipMy', 'my'),
					new TextField('TooltipAt', 'at')
				),
				new LiteralField('HelpPositionNote', '<p>These allow you to
				specify the position of the elements relative to each other.
				Each position is in the format "horizontal vertical", where
				horizontal can be one of left, center or right (default
				center), and vertical can be top, center or bottom (default
				center)</p>'),
				new FieldGroup('Tooltip size',
					new TextField('TooltipWidth', ''),
					new LiteralField('SizeSeparator', 'x'),
					new TextField('TooltipHeight', ''),
					new LiteralField('DefaultSizeNote', '(default: 300 x "auto")')
				)
			)	
		);
	}
}
