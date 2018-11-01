import DS from 'ember-data';
import ENV from 'overcome-gravity/config/environment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default DS.JSONAPIAdapter.extend({

	localStorage: service('local-storage'),

	host: ENV.OVERCOME_GRAVITY_API,

	//This has to be a computed property, ember will not call it as a function
	headers: computed(function() {
		return {
			userid: this.localStorage.get('trialUserId')
		}
	})
});
