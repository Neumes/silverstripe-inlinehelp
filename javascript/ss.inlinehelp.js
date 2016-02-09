;(function($) {
	/**
	 * Embeds a configurable inline help icon with a link or tooltip popup next
	 * to an element.
	 */
	$.widget('ss.inlineHelp', {
		options: {
			type: 'tooltip',
			title: 'Help',
			icon: '<span class="ui-icon ui-icon-help"></span>',
			iconPosition: {
				my: 'left top',
				at: 'right top'
			},
			showOn: 'hover',
			text: '',
			link: false,
			linkFormat: '<a href="$Link">More information</a>',
			tooltipClass: '',
			tooltipPosition: {
				my: 'left top',
				at: 'right top'
			},
			tooltipSize: {
				width: 300,
				height: 'auto'
			},
			showOn: 'hover',
			tooltipDelay: 200,
			attachWith: 'appendTo'
		},
		_init: function() {
			var widget = this;
			var currentDim = {
				position: null,
				width: null
			};
			var updateInterval = null;
			
			function attachToDom(){
				var method = widget.options.attachWith;
				if (typeof widget.icon[method] == 'function') {
					widget.icon[method].call(widget.icon, widget.element)
				}
			}

			var updatePosition = function () {
				var cur = currentDim;
					var elem = widget;
					
				if (!widget.element) {
					clearInterval(updateInterval);
					return;
				}
				if (!widget.element[0].parentElement) {
					// node has been removed from the dom - lets remove the updateInterval,
					// the window.scroll event will still trigger though. need to fix this leak 
					// at some point!
					clearInterval(updateInterval);
					delete widget;
					return;
				}
				try {
					var newPos = widget.element.position();
					var newWidth = widget.element.width();
					
					if (typeof(newPos) == 'undefined' || typeof(newWidth) == 'undefined') {
						return;
					}

					if (typeof(currentDim) == 'undefined') {
						currentDim = {
							position: newPos,
							width: newWidth
						};
						return;
					}

					if ((currentDim && currentDim.position && 
						currentDim.position.top == newPos.top && 
						currentDim.position.left == newPos.left) && 
						currentDim.width == newWidth) {
						return;
					}

					currentDim.position = newPos;
					currentDim.width = newWidth;
					if (widget && widget.icon) {
						widget.icon.position($.extend(widget.options.iconPosition, {
							of: widget.element
						}));
					}
				} catch (e) {
					// ignore errors
				}
			}

			$(window).scroll(updatePosition);
			updateInterval = setInterval(updatePosition, 1000);

			if (this.options.type == 'link') {
				this.link = $('<a></a>')
					.addClass('ss-inlinehelp-link')
					.attr('href', this.options.link)
					.attr('title', this.options.title)
					.html(this.options.icon);

				this.icon = $('<div></div>')
					.addClass('ss-inlinehelp-icon ui-state-default ui-corner-all')
					.addClass('ss-inlinehelp-click')
					.html(this.link)
					.appendTo(this.element.parent())
					.position($.extend(this.options.iconPosition, {
						of: this.element
					}));
				attachToDom();
				return;
			}

			this.icon = $('<div></div>')
				.addClass('ss-inlinehelp-icon ui-state-default ui-corner-all')
				.html(this.options.icon)
				.position($.extend(this.options.iconPosition, {
					of: this.element
				}));
			attachToDom();

			this.tooltip = $('<div></div>')
				.addClass('ss-inlinehelp-tooltip ui-widget ui-widget-content ui-corner-all')
				.addClass(this.options.tooltipClass)
				.appendTo(document.body)
				.hide();

			this.tooltipHeader = $('<div></div>')
				.addClass('ss-inlinehelp-tooltip-title ui-widget-header ui-corner-top')
				.html(this.options.title)
				.appendTo(this.tooltip);

			this.tooltipContent = $('<div></div>')
				.addClass('ss-inlinehelp-tooltip-content')
				.html(this.options.text)
				.appendTo(this.tooltip);

			if (this.options.link) {
				var linkHTML = this.options.linkFormat
					.replace('$Link', this.options.link);

				this.tooltipLink = $('<div></div>')
					.addClass('ss-inlinehelp-tooltip-link ui-widget-header ui-corner-bottom')
					.html(linkHTML)
					.appendTo(this.tooltip);
			} else {
				this.tooltipContent.addClass('ui-corner-bottom');
			}

			if (this.options.showOn == 'click') {
				this.icon
					.addClass('ss-inlinehelp-click')
					.click(function() {
						widget.openTooltip();
						widget.tooltip.addClass('ss-inlinehelp-hideonclick');

						return false;
					});

				$(document).click(function() {
					$('.ss-inlinehelp-hideonclick').hide();
				});
			} else {
				$([this.icon, this.tooltip]).each(function(i, el) {
					el.hover(function() {
						widget.clearTimeout();
						widget.openTooltip();
					}, function() {
						widget.startTimeout();
					}).click(function() {
						widget.openTooltip();
						widget.tooltip.addClass('ss-inlinehelp-hideonclick');
						return false;
					});
				});
			}
		},
		openTooltip: function() {
			if (this.tooltip.is(':hidden')) {
				this.tooltip
					.show()
					.width(this.options.tooltipSize.width)
					.height(this.options.tooltipSize.height)
					.position($.extend(this.options.tooltipPosition, {
						of: this.icon
					}));

				this.tooltipContent
					.css('top', this.tooltipHeader.outerHeight());

				if (this.options.tooltipSize.height != 'auto') {
					this.tooltipContent.css({
						bottom: 0,
						overflow: 'auto'
					});
				} else {
					var height = this.tooltipHeader.height() + this.tooltipContent.outerHeight();
					if (this.tooltipLink) height += this.tooltipLink.height();
					this.tooltip.height(height + 5);
				}

				if (this.tooltipLink) {
					this.tooltipContent
						.css('bottom', this.tooltipLink.outerHeight());
				}
			}
		},
		closeTooltip: function() {
			this.tooltip.hide();
		},
		startTimeout: function() {
			var self = this;
			this.timeout = setTimeout(
				function() { self.closeTooltip(); }, this.options.tooltipDelay
			);
		},
		clearTimeout: function() {
			if (this.timeout) clearTimeout(this.timeout);
		}
	})
})(jQuery);