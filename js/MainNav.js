define(["Helpers", "lib/jquery"], function(h) {

	// scope vars
	var $nav, $btns, $brick, brickNr, currentPage;

	var clickButton = function( index ) {
		$btns.eq(index).trigger('click');
	};

	var registerEvents = function() {
		h.onUrlChange(function() {
			var id = h.url().substr(0, h.url().indexOf('/'));
			$btns.removeClass('is-active');
			$btns.filter(id || h.url()).addClass('is-active');
		});

		$(document).on('reloadbrick', function() {
			var time;

			brickNr = h.getData().requested.length

			$brick.addClass('is-loading');

			time = (h.url() === "#contribute") ? 0 : 600;

			setTimeout(function() {
				$brick.attr('data-brick', brickNr);

				h.removeClass($brick, 'is-loading');
			}, 600);
		});
	};

	return {
		init: function( options ) {
			console.log("MainNav initialized");

			$nav = options.mainNav;
			$btns = $nav.find('.btn');
			$brick = $btns.filter('.brick');

			registerEvents();

			$btns.first().trigger('click');

		}
	};

});
