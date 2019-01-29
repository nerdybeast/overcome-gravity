import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

	auth: service('auth'),

	actions: {

		login(username) {
			this.auth.login(username);
		},

		logout() {
			this.auth.logout();
		},

		tryAsGuest() {
			this.auth.createGuestAccount();
			this.transitionToRoute('workouts');
		}
	}

});
