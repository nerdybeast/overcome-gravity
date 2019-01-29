(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['auth0'],
      __esModule: true,
    };
  }

  define('auth0', [], vendorModule);
})();
