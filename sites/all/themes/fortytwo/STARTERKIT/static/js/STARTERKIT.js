(function($, Drupal, window, document, undefined) {

  Drupal.behaviors.STARTERKIT = {
    attach: function(context, settings) {
      var constants = Drupal.behaviors.fortytwoMain.constants;

      // Store responsive type
      var body = $('body');
      if (body.hasClass('layout-adaptive')) {
        constants.LAYOUT = {
          fluid: false,
          adaptive: true
        };
      }
      else if (body.hasClass('layout-fluid')) {
        constants.LAYOUT = {
          fluid: true,
          adaptive: false
        };
      }

      /**
       * initiate prettify again for unprettified selects and fileinputs
       * f.e. after ajax requests containing those input types
       * (as this is attach function is fired as callback)
       */
      if (typeof Drupal.behaviors.prettify === 'function') {
        $('select:not(".no-prettify"), input[type="file"]:not(".no-prettify")', context).each(function() {
          new Drupal.behaviors.prettify({ el: this });
        });
      }
    }
  };

})(jQuery, Drupal, this, this.document);
