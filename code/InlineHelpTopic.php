<?php
/**
 * An inline help topic which is attached to a DOM selector on any number of
 * pages.
 *
 * @package silverstripe-inlinehelp
 */
class InlineHelpTopic extends DataObject {

	private static $attachment_method_map = array(
		'appendTo' => 'Append to',
		'prependTo' => 'Prepend to',
		'insertBefore' => 'Insert before',
		'insertAfter' => 'Insert after'
	);

	public static $db = array(
		'Title'          => 'Varchar(100)',
		'DisplayType'    => 'Enum("Tooltip, Link", "Tooltip")',
		'Text'           => 'HTMLText',
		'Link'           => 'Varchar(100)',
		'AttachType'     => 'Enum("All, Pages, Children, Type", "Pages")',
		'AttachPageType' => 'Varchar(100)',
		'DOMPattern'     => 'Varchar(100)'
	);

	public static $has_one = array(
		'ParentFilter' => 'SiteTree'
	);

	public static $many_many = array(
		'Pages' => 'SiteTree'
	);

	public static $defaults = array(
		'ShowTooltip' => 'Hover',
		'DisplayType' => 'Tooltip',
		'AttachType'  => 'Pages'
	);

	public static $summary_fields = array(
		'Title',
		'DisplayType',
		'AttachedTo'
	);

	public static $searchable_fields = array(
		'Title'       => array('filter' => 'PartialMatchFilter'),
		'AttachType'  => array('filter' => 'ExactMatchFilter'),
		'DisplayType' => array('filter' => 'ExactMatchFilter'),
		'Text'        => array('title'  => 'Help text', 'filter' => 'PartialMatchFilter'),
		'Link'        => array('title'  => 'Help link', 'filter' => 'PartialMatchFilter')
	);

	/**
	 * Returns a summary/description of the pages this help object is attached
	 * to.
	 *
	 * @return string
	 */
	public function getAttachedTo() {
		switch ($this->AttachType) {
			case 'All':
				return 'All pages';
			case 'Pages':
				return 'Specific pages: ' . implode(', ', $this->Pages()->toArray());
			case 'Children':
				return 'Children of ' . $this->ParentFilter()->Title;
			case 'Type':
				return 'Pages of type ' . $this->AttachPageType;
		}
	}

	/**
	 * @return FieldSet
	 */
	public function getCMSFields() {
		Requirements::javascript(THIRDPARTY_DIR . '/jquery/jquery.js');
		Requirements::javascript('inlinehelp/javascript/InlineHelpAdmin.js');

		$fields = new FieldList(new TabSet('Root',
			new Tab('Main',
				new HeaderField('HelpHeader', 'Help Topic'),
				new TextField('Title', 'Title'),
				new OptionSetField('DisplayType', 'Display type', array(
					'Tooltip' => 'Display help text and/or link in tooltip',
					'Link'    => 'Click the icon to go to the help link'
				)),
				new HtmlEditorField('Text', 'Short help text'),
				new TextField('Link', 'Help link')
			),
			new Tab('Subject',
				new HeaderField('SubjectHeader', 'Help Subject(s)'),
				new TextField('DOMPattern', 'DOM pattern'),
				new LiteralField('DOMPatternNote', '<p>This is a jQuery (CSS)
				selector which specifies which elements to attach this help
				topic to. The same topic can be attached to multiple elements.
				</p>'),
				new DropdownField('DOMMethod', 'DOM attachment method', self::$attachment_method_map)
			),
			new Tab('AttachTo',
				new HeaderField('AttachToHeader', 'Attach Help To'),
				new OptionSetField('AttachType', '', array(
					'All'      => 'All pages',
					'Pages'    => 'Specific pages',
					'Children' => 'Children of the selected page',
					'Type'     => 'Instances of a specific page type'
				)),
				new TreeMultiSelectField('Pages', 'Pages', 'SiteTree'),
				new TreeDropdownField('ParentFilterID', 'Parent page', 'SiteTree'),
				new DropdownField('AttachPageType', 'Page type', ArrayLib::valuekey(
					ClassInfo::subclassesFor('Page')
				))
			)
		));

		$this->extend('updateCMSFields', $fields);

		return $fields;
	}

}