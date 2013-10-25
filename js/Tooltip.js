define(["Helpers", "lib/jquery"], function(h) {

	// scope vars
	var $markup = $('<div class="tooltip" />'), timer;

	var getPosition = function( $el ) {
		var info = h.getElementInfo($el),
			top = info.top - $tooltip.outerHeight() + 15,
			left = info.left,
			centering = info.width - ($tooltip.outerWidth()/2)

		return {
			top: top,
			left: left + centering
		};
	};

	var checkTooltipActive = function( id ) {
		var $t = $('.tooltip[data-tooltip-id=' + id + ']').not('.is-hidden');

		if($t.length) {
			return true;
		}
	};

	var createTooltip = function( $el ) {
		var tooltip	= $el.attr('title'), $tooltip;

		$el.attr('data-tooltip', tooltip)
			.attr('data-tooltip-id', h.createID())
			.removeAttr('title');

		$el.trigger('mouseenter');
	};

	var showTooltip = function( $el ) {
		var tooltip = $el.attr('data-tooltip'),
			id = $el.attr('data-tooltip-id'), pos;

		clearTimeout(timer);

		if(checkTooltipActive(id)) {
			return false;
		}

		$tooltip = $markup.clone();

		$tooltip.attr('data-tooltip-id', id)
			.text(tooltip);

		$tooltip.appendTo('body');

		pos = getPosition($el);

		$tooltip.css({
			top: pos.top,
			left: pos.left
		});

		h.setClass($tooltip, 'is-visible');
	};

	var startTooltipTimer = function() {
		timer = setTimeout(function() {
			$tooltip.addClass('is-hidden');
			setTimeout(function() {
				removeTooltip();
			}, 1000);
		}, 500);
	};

	var hideTooltip = function( $el ) {
		var id = $el.attr('data-tooltip-id'),
			$tooltip = $('.tooltip[data-tooltip-id=' + id + ']');

		startTooltipTimer();
	};

	var removeTooltip = function() {
		$('.tooltip.is-hidden').remove();
	};

	var registerEvents = function() {
		$(document).on('mouseenter', '[title]', function() {
			createTooltip($(this));
		})
		.on('mouseenter', '[data-tooltip]', function() {
			showTooltip($(this));
		})
		.on('mouseleave', '[data-tooltip]', function() {
			hideTooltip($(this));
		});

	};

	!function() {
		console.log("Tooltip initialized");

		registerEvents();
	}();

});
