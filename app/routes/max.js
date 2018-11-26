import Route from '@ember/routing/route';
import { uuid } from 'ember-cli-uuid';

export default Route.extend({

	queryParams: {
		exerciseClientId: {
			refreshModel: true
		},
		workoutClientId: {
			refreshModel: true
		}
	},

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

		return this.get('store').peekRecord('max', max_id);
	}

});
