import Route from '@ember/routing/route';
import { uuid } from 'ember-cli-uuid';
import { isBlank } from '@ember/utils';

export default Route.extend({

	queryParams: {
		maxClientId: {
			refreshModel: true
		},
		exerciseClientId: {
			refreshModel: true
		},
		workoutClientId: {
			refreshModel: true
		}
	},

	model(params) {

		const { max_id, maxClientId } = params;
		const store = this.get('store');

		if(max_id === 'new') {
			
			if(!isBlank(maxClientId)) {
				return store.peekAll('max').findBy('clientId', maxClientId);
			}
			
			return store.createRecord('max', {
				clientId: uuid()
			});
		}

		return this.get('store').peekRecord('max', params.max_id);
	}

});
