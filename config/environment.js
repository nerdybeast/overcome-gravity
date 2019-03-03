'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'overcome-gravity',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    //https://github.com/thaume/ember-cli-uuid
    'ember-cli-uuid': {
      defaultUUID: false
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    //ENV.APP.LOG_BINDINGS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  ENV.OVERCOME_GRAVITY_API = process.env.OVERCOME_GRAVITY_API;
  ENV.AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
  ENV.AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
  ENV.AUTH0_CALLBACK_URL = process.env.AUTH0_CALLBACK_URL;

  return ENV;
};
