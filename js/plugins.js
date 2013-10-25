(function( $ ) {

	if ( !$.cssHooks ) {
		throw( new Error( "jQuery 1.4.3+ is needed for this plugin to work" ) );
	}

	function styleSupport( prop ) {
		var vendorProp, supportedProp,
			capProp = prop.charAt( 0 ).toUpperCase() + prop.slice( 1 ),
			prefixes = [ "Moz", "Webkit", "O", "ms" ],
			div = document.createElement( "div" );

		if ( prop in div.style ) {
			supportedProp = prop;
		} else {
			for ( var i = 0; i < prefixes.length; i++ ) {
				vendorProp = prefixes[ i ] + capProp;
				if ( vendorProp in div.style ) {
					supportedProp = vendorProp;
					break;
				}
			}
		}

		div = null;
		$.support[ prop ] = supportedProp;
		return supportedProp;
	}

	// custom css hooks
	var transform = styleSupport( "transform" );

	// Set cssHooks only for browsers that support a vendor-prefixed transform
	if ( transform && transform !== "transform" ) {
		$.cssHooks.transform = {
			get: function( elem, computed, extra ) {
				return $.css( elem, transform );
			},
			set: function( elem, value) {
				elem.style[ transform ] = value;
			}
		};
	}

	// add ":Contains" to jQuery for case insensitive :contains
	jQuery.expr[':'].Contains = function(a, i, m) {
		return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};

})( jQuery );
