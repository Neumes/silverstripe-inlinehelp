<?php

/**
 * InlineHelpTopicBootstrap
 *
 * @author Stephen McMahon <stephen@silverstripe.com.au>
 */
class InlineHelpTopicBootstrap extends DataExtension {

	private static $db = array(
		'container' => 'Varchar',
		'html' => 'Boolean(0)',
		'placement' => 'Enum("top, right, bottom, left", "right")',
		'trigger'    => 'Enum("hover focus, click", "click")'
		/* TODO(Steve) need a way to set custom templates for pop ups */
		//'template' => 'Varchar',
	);

	public function updateCMSFields(FieldList $fields) {
		$fields->addFieldToTab('Root',
			new Tab('Advanced',
				new HeaderField('AdvancedHeader', 'Advanced Inline Help Options'),
				new DropdownField('trigger', 'Show tooltip on', array(
					'click' => 'On mouse click',
					'hover focus' => 'On mouse hover'
				)),
				new LiteralField('HelpPositionNote', '<p>Set the default pop over placement. For example, if placement
					is "left", the popover will display to the left when possible, otherwise it	will display right.</p>'),
				new DropdownField('placement', 'Place tooltip to the', array(
					'right' => 'Right',
					'left' => 'Left',
					'top' => 'Top',
					'bottom' => 'Bottom'
				))
			)
		);
	}
}
