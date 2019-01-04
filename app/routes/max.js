import Route from '@ember/routing/route';
import { uuid } from 'ember-cli-uuid';

export default Route.extend({

	model(params) {

		const { max_id } = params;
		const store = this.get('store');

		if(max_id === 'new') {

			return store.createRecord('max', {
				clientId: uuid(),
				kg: 0,
				lbs: 0
			});
		}

		return this.get('store').findRecord('max', max_id);
	}

});
