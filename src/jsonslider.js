// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else if ( typeof module === "object" && module.exports ) {

		// Node/CommonJS
		module.exports = function( root, jQuery ) {
			if ( jQuery === undefined ) {
				if ( typeof window !== "undefined" ) {
					jQuery = require( "jquery" );
				}			else {
					jQuery = require( "jquery" )( root );
				}
			}
			factory( jQuery );
			return jQuery;
		};
	} else {

		// Browser globals
		factory( jQuery );
	}
}( function( $ ) {

	// Set the plugin name
	var pluginName = "jsonSlider";

	$.fn[ pluginName ] = function( options ) {

		var def = $.extend( true, {
			css: {
				parent: {
					position: "relative"
				},
				wrap: {
					position: "relative",
					width: "100%",
					height: "100%",
					margin: "0 auto",
					padding: 0,
					backgroundColor: "inherit",
					overflow: "hidden",
					textAlign: "center"
				},
				figure: {
					position: "relative",
					width: "100%",
					height: "100%"
				},
				img: {
					position: "absolute",
					margin: "auto",
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					maxWidth: "100%",
					maxWidth: "100%",
					lineHeight: 0,
					margin: "0 auto"
				}
			}
		}, options );

		return this.each( function() {
			var $parentW, $parentH, $wrap,
				cfg = $.extend( true, def, options ),
				$parent = $( this ),
				json = $parent.data( "json" ),
				aspect = $parent.data( "aspect-ratio" ),
				css = cfg.css,
				AR = aspect.split( ":" ),
				ARx = parseInt( AR[ 0 ] ),
				ARy = parseInt( AR[ 1 ] ),
				arI = ARx / ARy;

			$parentW = parseInt( $parent.css( "width" ) );
			$parentH = parseInt( $parent.css( "height" ) );

			$parent.append( "<div>" );
			$wrap = $parent.children();

			$( window ).resize( function() {
				var parentStyle = {
						height: $parentW / arI
					},
					newStyle = $.extend( {}, css.parent, parentStyle );

				if ( $parentH === 0 ) {
					$parent.css( newStyle );
				}

				$wrap.css( css.wrap );
			} );

			$.getJSON( json, function( data ) {
				var $figs, $first, i,
					arr = $.map( data, function( el ) {
						return el;
					} );

				for ( i = 0; i < arr.length; i++ ) {
					var $img = "<figure><img src='" +
						arr[ i ].url + "' alt='" +
						arr[ i ].alt + "'/></figure>";

					$wrap.append( $( $img ) );
				}

				$figs = $wrap.children();
				$figs.css( css.figure );

				$first = $figs.first();
				$first.attr( "data-status", "active" );

				$figs.not( $first ).hide();

				function slider() {
					var $next,
						$active = $wrap.find( "[data-status='active']" );

					if ( $active.next().length === 0 ) {
						$next = $first;
					} else {
						$next = $active.next();
					}

					$active.fadeOut( 1000, function() {
						$( this ).attr( "data-status", "inactive" );
					} );
					$next.fadeIn( 1000, function() {
						$( this ).attr( "data-status", "active" );
					} );
				}

				setTimeout( setInterval( function() {
					slider();
				}, 4000 ), 5000 );

				$( window ).resize();
			} );
		} );
	};
} ) );
