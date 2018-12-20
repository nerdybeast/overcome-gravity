import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import EmberObject from '@ember/object';
import { uuid } from 'ember-cli-uuid';

export default Route.extend({

	model(params) {

		const { set_id, setClientId, exerciseClientId } = params;

		if(isEmpty(set_id)) {
			//TODO: Throw error...
		}

		const store = this.get('store');

		let exerciseSet;

		if(!isEmpty(set_id) && set_id !== 'new' && set_id !== 'unsaved') {

			exerciseSet = store.peekRecord('set', params.set_id);

		} else if(!isEmpty(set_id) && set_id === 'new') {

			const clientId = uuid();
			const exercise = store.peekAll('exercise').findBy('clientId', exerciseClientId);

			if(!exercise) {
				return this.transitionTo('workout', 'new');
			}

			const previousSet = exercise.get('sets.lastObject') || EmberObject.create();

			exerciseSet = store.createRecord('set', {
				clientId,
				order: exercise.get('nextSetOrderNumber'),
				reps: previousSet.get('reps'),
				percent: previousSet.get('percent'),
				repeatCount: previousSet.get('repeatCount'),
				kg: previousSet.get('kg') || 0,
				lbs: previousSet.get('lbs') || 0,
				exercise
			});

		} else if(!isEmpty(set_id) && set_id === 'unsaved' && !isEmpty(setClientId)) {

			exerciseSet = store.peekAll('set').findBy('clientId', setClientId);

		}

		return exerciseSet;
	},

	setupController(controller, exerciseSet) {

		this._super(controller, exerciseSet);

		const store = this.get('store');
		controller.set('maxes', store.peekAll('max'));
	}
});
