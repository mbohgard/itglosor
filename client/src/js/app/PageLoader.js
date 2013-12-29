define(["app/Helpers", "lib/jquery"], function(h) {

    "use strict";

    // scope vars
    var pages, $pages = $([]), $blinds, $bar, progressInterval,
        transitionEnd = 'webkitTransitionEnd transitionend',
        tempChangeTimer = 0;

    /**
     * wrap words and word pointers in links
     * @param  {Object} words       object with all words and descriptions
     * @param  {String} currentWord word currently being parsed
     * @param  {String} currentDesc description currently being parsed
     * @param  {String} pointer     word currentWord is pointing to if any
     * @return {Object/String}      object or string with parsed result
     */
    var parseWords = function( words, currentWord, currentDesc, pointer ) {
        var re, word, desc, result;

        if(pointer) {
            result = 'Se <a href="#search/' + pointer + '">' +  pointer + '</a>.';
            return result;
        }

        pointer = '';

        $.each(words, function( index, key ) {
            word = key.word;

            if(word !== currentWord && key.pointer !== currentWord) {
                re = new RegExp(word, "gi");
                currentDesc = currentDesc
                    .replace(re, ' <a href="#search/' + word + '">' + word + '</a> ');
            }

            pointer += (key.pointer === currentWord) ? ', ' + word : '';

            result = {
                desc: currentDesc,
                pointer: pointer
            };
        });


        return result;
    };

    /**
     * render word list from template
     */
    var renderWordList = function() {
        var $container = $('.word-list ul'),
            $template = $container.find('.template'),
            $clone, $word, $desc, words, word, desc, pointer;

        words = h.getData().words.sort(h.sortBy('word', true));

        $.each(words, function( index, value) {
            $clone = $template.clone();
            $word = $clone.find('.word');
            $desc = $clone.find('.word-desc p');
            desc = value.desc;
            pointer = value.pointer;

            word = value.word;
            desc = parseWords(words, word, desc, pointer);

            if(typeof desc === "object") {
                pointer = desc.pointer.substring(2);
                desc = desc.desc;

                if(pointer) {
                    $desc.find('.pointer')
                        .text(pointer)
                        .addClass('is-visible');
                }
            }

            $word.text(word);
            $desc.prepend(desc);

            if(value.pointer) $clone.addClass('pointer');

            $clone.removeClass('template').appendTo($container);
        });

        showPage();
    };

    var renderRequested = function() {
        var data = h.getData().requested,
            $container = $('.request-info ul'),
            $template = $container.find('.template'), $clone;

        $container.find('li:not(.template)').remove();

        $.each(data, function( index, value ) {
            $clone = $template.clone();

            $clone.removeClass('template').text(value)
                .appendTo($container);
        });

    };

    var renderContribute = function() {
        var data = h.getData().requested,
            $container = $('.contribute ul'),
            $template = $container.find('.template'), interval = 0;

        $container.find('li:not(.template)').remove();

        $.each(data, function( index, value ) {
            var $clone = $template.clone();

            $clone.removeClass('template').find('a').text(value);
            $clone.appendTo($container);
            setTimeout(function() {
                $clone.find('a').removeClass('is-hidden');
            }, interval);

            interval += 150;
        });
    };

    /**
     * loading and rendering complete, first show
     * progress bar 100%, fade out bar and fade out blinds,
     * set url if not set, fix url if incorrect
     * show brick with requested words amount
     */
    var showPage = function() {
        clearInterval(progressInterval);

        $bar.css({ width: "100%" });

        setTimeout(function() {
            $bar.css({ opacity: 0 });
        }, 500);

        setTimeout(function() {
            $blinds.addClass('remove');

            if(!h.url()) h.url('#search');
            else h.url(h.url());
        }, 750);

        setTimeout(function() {
            $(document).trigger('reloadbrick');
            $blinds.on(transitionEnd, function() {
                $blinds.remove();
            });
        }, 1100);
    };

    /**
     * load words, start progress bar animation
     */
    var initializePage = function() {
        var url = 'data.json',
            progress = 1, rand;

        $.getJSON(url).done(function( data ) {
            h.setData(data);

            renderWordList();
        });

        progressInterval = setInterval(function() {
            $bar.css({ width: progress + "%" });

            rand = Math.floor((Math.random()*15)+1);

            if(progress > 90) progress = progress + 0.1;
            else progress = progress + rand;

        }, 100);
    };

    var switchPage = function() {
        var url = h.url().substring(1), $current, end = 0;

        for(var key in pages) {
            $current = pages[key];

            if(key === url) {
                $current.show();
                h.setClass($current, 'is-active');
            } else {
                $current.removeClass('is-active').on(transitionEnd, function() {
                    $pages.not('.is-active').hide().off(transitionEnd);
                });
            }
        }

        if(h.url() === "#request") {
            renderRequested();
        } else if(h.url() === "#contribute") {
            renderContribute();
        }
    };

    var registerEvents = function() {

        /**
         * if url doesn't contain a /, add it
         */
        h.onUrlChange(function() {
            if(!h.urlContains('/')) {
                h.url(h.url() + '/');
            }

            if(h.url().indexOf('/') === -1) {
                switchPage();
            }

            console.log("Change event run " + ++tempChangeTimer + " times.");
        });
    };

    return {
        init: function( options ) {
            console.log("PageLoader initialized");

            pages = options.pages;

            $pages = $('.page');

            $blinds = $('.blinds');
            $bar = $blinds.find('.blinds-progress');

            registerEvents();

            initializePage();
        }
    };

});
