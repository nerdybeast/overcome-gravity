import Route from '@ember/routing/route';

export default Route.extend({

	model() {

		const preferences = this.store.peekAll('preferences');

		if(preferences.length === 0) {
			return this.store.createRecord('preferences', {
				weightType: 'both'
			});
		}

		return preferences.firstObject;
	}
});
