import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { reject } from 'rsvp';

export default Route.extend({

	auth: service('auth'),
	localStorage: service('local-storage'),

	model() {

		return this.auth.checkLogin().catch(e => {

			if(e.error !== 'login_required' /*|| e.error !== 'consent_required'*/) {
				return reject(e);
			}

		});

	}
});
