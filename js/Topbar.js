define(["lib/jquery"], function() {

	// scope vars
	var $header, $info, $nav, $links, $target, $infoWrapper, infoHeight, $btn,
		show = false;

	var setInfoHeaderHeight = function() {
		infoHeight = $info.height();

		$info.css({
			height: infoHeight,
			top: -infoHeight,
			opacity: 1
		});
	};

	var toggleHiddenInfo = function( action ) {
		toggleHeaderDimming();
		toggleNavPosition();

		if(action) {
			addCloseButton();
			toggleCloseButton(true);

			$('html').on('click', function(e) {
				if(!$(e.target).parents('#topbar').length) {
					toggleHiddenInfo(false);
				}
			});

			show = true;
		} else {
			$links.removeClass('is-active');
			setHeadersHeight(false);
			toggleCloseButton(false);

			$('html').off('click');

			show = false;
		}
	};

	/**
	 * toggle dimming of header
	 */
	var toggleHeaderDimming = function() {
		$header.find('.page-title').toggleClass('is-dimmed');
	};

	var toggleNavPosition = function() {
		var headerWidth, navWidth, translateTo;

		if(show === false) {
			headerWidth = $header.find('.header-content').outerWidth();
			navWidth = $nav.outerWidth();
			translateTo = translateTo = (headerWidth/2) - (navWidth/2);

			$nav.css({
				transform: 'translate(-' + translateTo + 'px, 0px)'
			});
		} else {
			$nav.css({
				transform: 'translate(0,0)'
			});
		}
	};

	var getTargetPosition = function() {
		var goalPosition = $header.find('.header-content').offset().left,
			wrapperPosition = $infoWrapper.offset().left,
			targetPosition = $target.position().left;

		return goalPosition - targetPosition + wrapperPosition;
	};

	var navigateToSection = function() {
		var x = getTargetPosition();

		$infoWrapper.css({
			transform: 'translate(' + x + 'px,0)'
		});

		$target.addClass('is-visible').siblings().removeClass('is-visible');
	};

	var setHeadersHeight = function( action ) {
		var $headers = $info.add($header), height;

		$headers.toggleClass('is-expanded', action);

		height = ($headers.hasClass('is-expanded')) ? $target.outerHeight() : 0;

		$headers.css({
			transform: 'translate(0, ' + height + 'px',
		});
	};

	var addCloseButton = function() {
		if(!$btn) {
			$btn = $('<a class="hidden-info-close" />');
			$btn.append('<i class="icon-remove" />');

			$btn.appendTo('body');
		}
	};

	var toggleCloseButton = function( action ) {
		var ms = (action) ? 400 : 250,
			t = setTimeout(function() {
			$btn.toggleClass('is-visible', action);
		}, ms);

	};

	var registerEvents = function() {
		$links.on('click', function() {
			var $this = $(this);

			$target = $infoWrapper.find($this.attr('href'));

			if(show === false) toggleHiddenInfo(true);

			$links.removeClass('is-active');
			$this.addClass('is-active');

			navigateToSection();
			setHeadersHeight(true);

			return false;
		});
	};

	return {
		init: function( options ) {
			console.log("Topbar initialized");

			$header = options.header;
			$info = options.hiddenInfo;
			$nav = $header.find('nav');
			$links = $nav.find('a');
			$infoWrapper = $info.find('.hidden-info-wrapper');

			registerEvents();

			setInfoHeaderHeight();
		}
	};

});
