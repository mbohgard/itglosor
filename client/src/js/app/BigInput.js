define(["app/Helpers", "lib/jquery"], function(h) {

    "use strict";

    // scope vars
    var $container, $wrapper, $input, $labels, $enterSign;

    var switchLabel = function() {
        var id = h.url().substring(1), $els = $container.add($input);

        if(id !== "contribute") $input.val('').focus();
        else return false;

        $.each($labels, function() {
            var $this = $(this), c = $this.attr('class');

            if($this.hasClass(id)) {
                $els.addClass(c);
            } else {
                $els.removeClass(c);
            }
        });
    };

    var toggleEnterSign = function() {
        if(h.url() === "#request" && $input.val().length > 1) {
            $enterSign.addClass('is-visible');
        } else {
            $enterSign.removeClass('is-visible');
        }
    };

    var registerEvents = function() {
        h.onUrlChange(function() {
            if(h.url() === "#search" || h.url() === "#request") {
                $wrapper.removeClass('is-hidden');
                switchLabel();
                toggleEnterSign();
            } else if(h.url() === "#contribute") {
                $wrapper.addClass('is-hidden');
            }
        });

        $input.on('keyup', function() {
            if(h.urlContains('search')) {
                h.url('#search/' + $input.val());
            }

            if(h.url() === "#request") {
                toggleEnterSign();
            }

        });

        $enterSign.on('click', function() {
            return false;
        });
    };

    return {
        init: function( options ) {
            console.log("BigInput initialized");

            $container = options.bigInput;
            $wrapper = $container.parent('div');
            $input = $container.find('#mainInput');
            $labels = $container.find('label');
            $enterSign = $container.find('.enter-sign');

            registerEvents();

            setTimeout(function() {
                //$input.val('hej').trigger('keyup');
            }, 1000);


        }
    };

});
