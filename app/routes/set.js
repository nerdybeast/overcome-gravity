import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import EmberObject from '@ember/object';
import { uuid } from 'ember-cli-uuid';

export default Route.extend({

	queryParams: {
		setClientId: {
			refreshModel: true
		},
		exerciseClientId: {
			refreshModel: true
		}
	},

	model(params) {

		const { set_id, setClientId, exerciseClientId } = params;

		if(isEmpty(set_id)) {
			//TODO: Throw error...
		}

		const store = this.get('store');
		const maxes  = store.peekAll('max');

		let exerciseSet;

		if(!isEmpty(set_id) && set_id !== 'new' && set_id !== 'unsaved') {

			exerciseSet = store.peekRecord('set', params.set_id);

		} else if(!isEmpty(set_id) && set_id === 'new') {

			const clientId = uuid();
			const exercise = store.peekAll('exercise').findBy('clientId', exerciseClientId);
			const previousSet = exercise.get('sets.lastObject') || EmberObject.create();

			exerciseSet = store.createRecord('set', {
				clientId,
				order: (previousSet.get('order') || 0) + 1,
				reps: previousSet.get('reps') || 1,
				percent: previousSet.get('percent') || 50,
				repeatCount: previousSet.get('repeatCount') || 1,
				kg: previousSet.get('kg') || 0,
				lbs: previousSet.get('lbs') || 0,
				exercise
			});

		} else if(!isEmpty(set_id) && set_id === 'unsaved' && !isEmpty(setClientId)) {

			exerciseSet = store.peekAll('set').findBy('clientId', setClientId);

		}

		return { exerciseSet, maxes };
	}

});
