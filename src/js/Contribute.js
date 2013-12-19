define(["app/Helpers", "lib/jquery"], function(h) {

    "use strict";

    // scope vars
    var $container, $div, info;

    var makeDiv = function( $el ) {
        info = h.getElementInfo($el);
        $div = $('div.explain-word.template').clone();

        $div.prepend($el.text()).css({
            top: info.top,
            left: info.left,
            width: info.width,
            height: info.height
        }).removeClass('template is-disabled');

    };

    var showDiv = function() {
        $div.appendTo('body');

        h.setClass($div, 'is-expanded');
    };

    var removeDiv = function( panic ) {
        if(!$div) return false;

        if(panic) {
            $div.remove();
            return false;
        }

        $div.removeClass('is-expanded');
        $container.find('.explain-word').removeClass('is-disabled');

        $div.one('transitionEnd webkitTransitionEnd', function(e) {
            var $link = $container.find('a.is-active').css('opacity', 1);

            h.removeClass($link, 'is-active');
            $div.remove();
        });

    };

    var explainWord = function( $el ) {
        $container.find('li:not(.template) .explain-word')
            .removeClass('is-active')
            .addClass('is-disabled');
        $el.css('opacity', '').addClass('is-active');

        makeDiv($el);

        showDiv();
    };

    var registerEvents = function() {
        $(document).on('click.explainWord', 'a.explain-word', function() {
            explainWord($(this));

            return false;
        })
        .on('click.closePopup', '.popup .close-button', function() {
            removeDiv();

            return false;
        });

        h.onUrlChange(function() {
            removeDiv(true);
        });
    };

    return {
        init: function( options ) {
            console.log("Contribute initialized");

            $container = options.contribute;

            registerEvents();
        }
    };

});
