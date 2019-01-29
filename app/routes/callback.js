import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

	auth: service('auth'),

	beforeModel() {
		return this.auth.handleAuthentication().then(() => this.transitionTo('workouts'));
	}

});
