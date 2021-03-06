(function($) {

// Define jRespond Media queries.
var jRes = jRespond([
	{
		label: 'mobile',
		enter: 0,
		exit: 480
	},{
		label: 'tablet',
		enter: 481,
		exit: 979
	},{
		label: 'desktop',
		enter: 980,
		exit: 9999
	}
]);

// Modify the Search field for module filter.
Drupal.behaviors.adminimal_module_filter_box = {
  attach: function (context, settings) {
    //Add default hint value using the HTML5 placeholder attribute.
    $('input#edit-module-filter-name').attr( "placeholder", Drupal.t('Search') );
  }
};

// Fix some krumo styling.
Drupal.behaviors.krumo_remove_class = {
  attach: function (context, settings) {
  	// Find status messages that has krumo div inside them, and change the classes.
    $('#console .messages.status').has("div.krumo-root").removeClass().addClass( "krumo-wrapper" );
  }
};

// Add media query classes to the body tag.
Drupal.behaviors.adminimal_media_queries = {
	attach: function (context, settings) {
		jRes.addFunc([
			{
				breakpoint: 'mobile',
					enter: function() {
						$( "body" ).addClass( "mq-mobile" );
					},
					exit: function() {
						$( "body" ).removeClass( "mq-mobile" );
					}
			},{
				breakpoint: 'tablet',
					enter: function() {
						$( "body" ).addClass( "mq-tablet" );
					},
					exit: function() {
						$( "body" ).removeClass( "mq-tablet" );
					}
			},{
				breakpoint: 'desktop',
					enter: function() {
						$( "body" ).addClass( "mq-desktop" );
					},
					exit: function() {
						$( "body" ).removeClass( "mq-desktop" );
					}
			}
		]);
	}
};

// Move the active primary tab on mobile to be displayed last. 
Drupal.behaviors.adminimal_move_active_primary_tab = {
	attach: function (context, settings) {
  	// Add primary tabs class to the branding div for the bottom border.
    $('#branding').has("ul.tabs.primary").addClass( "has-primary-tabs" );

		// register enter and exit functions for a single breakpoint
		jRes.addFunc({
			breakpoint: 'mobile',
				enter: function() {
					$( "ul.tabs.primary li.active" ).clone().appendTo( "ul.tabs.primary" ).removeClass( "active" ).addClass( "current" );
					$( "ul.tabs.primary li.active" ).hide();
				},
				exit: function() {
					$( "ul.tabs.primary li.active" ).show();
					$( "ul.tabs.primary li.current" ).hide();
				}
		});
	}
};

// Remove outline when clicking on links.
Drupal.behaviors.adminimal_link_focus_on_click = {
  attach: function (context, settings) {

  	// Remove focus outlines on keypress.
		$("body.adminimal-theme a").keypress(function() {
			this.blur();
			this.hideFocus = false;
			this.style.outline = null;
		});

  	// Remove focus outlines on mousedown (click).
		$("body.adminimal-theme a, select, input, textarea, label").mousedown(function() {
			this.blur();
			this.hideFocus = true;
			this.style.outline = 'none';
		});

  }
};

})(jQuery);
