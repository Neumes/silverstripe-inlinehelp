SilverStripe Inline Help Module
===============================

Maintainer Contacts
-------------------
*  Tom Brewer-Vinga (<andrew@silverstripe.com.au>)

Requirements
------------
* SilverStripe 3.2+

Documentation
-------------

Changelog
-------------

**1.0**

- Updated to SilverStripe 3.2
	- Earlier versions of SilverStripe 3 have not been tested

Known Bugs
----------

- The displayed fields in the admin section under the tab "Attach To" display incorrectly with the selected radio button when the item is dynamically loaded

Installation Instructions
-------------------------

1. Place this directory in the root of your SilverStripe installation.
2. If cloned or using the zip file, change the directory to just `inlinehelp`
3. Add the following lines of code to your Page init function ```
if($this->dataRecord) {
	$this->dataRecord->extend('onPageInit', $this);
} else {
	singleton('SiteTree')->extend('onPageInit', $this);
}
```
4. Visit yoursite.com/dev/build to rebuild the database.