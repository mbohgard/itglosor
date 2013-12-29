define(["lib/jquery"], function() {

    "use strict";

    var hash, pageData, $root = $('html, body');

    return {

        $root: $root,

        getData: function() {
            return pageData;
        },

        setData: function( data ) {
            pageData = data;
        },

        getElementInfo: function( $el ) {
            return {
                width: $el.outerWidth(),
                height: $el.outerHeight(),
                left: $el.offset().left,
                top: $el.offset().top
            };
        },

        createID: function() {
            var id = new Date().valueOf();

            return id;
        },

        sortBy: function( field, reverse, primer ) {
            var key = function( x ) {
                return primer ? primer(x[field]) : x[field];
            };

            return function( a, b ) {
                var A = key(a), B = key(b);
                return ((A < B) ? -1 : (A > B) ? +1 : 0) * [-1,1][+!!reverse];
            };
        },

        setClass: function( $el, c ) {
            setTimeout(function() {
                $el.addClass(c);
            }, 0);
        },

        removeClass: function( $el, c ) {
            setTimeout(function() {
                $el.removeClass(c);
            }, 0);
        },

        url: function( string ) {
            hash = window.location.hash;

            if(string) {
                if(hash === string || hash === (string + '/')) {
                    $(window).trigger('hashchange');
                } else {
                    if(string.indexOf('/') !== -1) {
                        string = string;
                    } else {
                        string = string + '/';
                    }
                    window.location.hash = string;
                }
            } else {
                if(hash.slice(-1) === '/') {
                    hash = hash.slice(0, -1);
                }
                return hash;
            }

        },

        urlContains: function( string ) {
            return window.location.hash.indexOf(string) !== -1;
        },

        onUrlChange: function( callback ) {
            $(window).on('hashchange', callback);
        }
    };

});
