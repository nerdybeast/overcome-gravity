import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('max', { path: '/max/:max_id' });
  this.route('maxes', function() {});
  this.route('workouts');
  this.route('workout', { path: '/workout/:workout_id' });
  this.route('set', { path: '/set/:set_id' });
  this.route('exercise', { path: '/exercise/:exercise_id' });
  this.route('callback');
});

export default Router;
