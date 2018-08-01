import Route from '@ember/routing/route';

export default Route.extend({

	model(params) {

		const store = this.get('store');

		if(params.max_id === 'new') {
			return store.createRecord('max');
		}

		return this.get('store').peekRecord('max', params.max_id);
	}

});
