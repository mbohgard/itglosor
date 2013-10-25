define(["MainNav", "Helpers", "lib/jquery"], function(MainNav, h) {

	// scope vars
	var $list, $li, $siblings, $back;

	/**
	 * get height of current clicked words description
	 * @return {Int} height of description
	 */
	var getHeight = function() {
		var $p = $li.find('p'), width = $p.outerWidth(),
			$clone = $p.clone(), height;

		$clone.addClass('get-height').width(width)
			.appendTo($li.find('.word-desc'));

		height = $clone.height();

		$clone.remove();

		return height;
	};

	/**
	 * show word description
	 */
	var showDesc = function() {
		var height;

		if($li.hasClass('is-expanded')) {
			height = getHeight();

			$siblings.find('.word-desc p').height('');
			$li.find('.word-desc p').height(height);

		} else {
			$li.find('.word-desc p').height('');
		}
	};

	/**
	 * filter word list on search word in url
	 * if results < 2, expand word i.e show description
	 * @param  {String} val search string to filter on
	 */
	var filterList = function( val ) {
		var $words = $list.find('li:not(.template) .word'), $expand;

		if(val === '') {
			$words.parent('li').show();
			return false;
		}

		$words.not(':Contains(' + val + ')').parent('li').hide();
		$words.filter(':Contains(' + val + ')').parent('li').show();

		$expand = $words.filter(':visible');

		if($expand.length < 2) expandWord($expand);

		if($words.filter(':hidden').length) $back.addClass('is-visible');
	};

	var expandWord = function( $el ) {
		var $li = $el.parents('li');
			condition = $el.hasClass('is-expanded') ||
			$li.hasClass('is-expanded');

		if(!condition && !$li.hasClass('pointer')) {
			$el.trigger('click');
		}
	};

	var resetList = function() {
		var $lis = $list.find('li:not(.template)').show();

		$lis.filter('.is-expanded').trigger('click');
		$back.removeClass('is-visible');
	};

	var registerEvents = function() {
		$(document).on('click', '.word-list li', function(e) {
			$li = $(e.target).parents('li');

			if($li.length === 0) $li = $(this);

			$siblings = $list.find('.is-expanded').not($li);

			$siblings.removeClass('is-expanded');
			$li.toggleClass('is-expanded');

			showDesc();
		});

		h.onUrlChange(function() {
			var search = "#search/", val;

			if(h.urlContains(search)) {
				val = h.url().replace(search, '');

				if(val.indexOf('#') !== -1) val = '';
				filterList(val);

				if(!val) resetList();

				h.$root.scrollTop(0);
			} else {
				$back.removeClass('is-visible');
			}
		});
	};

	return {
		init: function( options ) {
			console.log("WordList initialized");

			$list = options.wordList;
			$back = options.backLink;

			registerEvents();
		}
	};

});
