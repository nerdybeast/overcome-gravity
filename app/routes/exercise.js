import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';

export default Route.extend({

	queryParams: {
		exerciseClientId: {
			refreshModel: true
		},
		workoutClientId: {
			refreshModel: true
		},
		maxClientId: {
			refreshModel: true
		}
	},

	model(params) {

		const { exercise_id, workoutClientId } = params;

		if(isEmpty(exercise_id)) {
			//TODO: Throw error...
		}

		const store = this.get('store');
		const exercises = store.peekAll('exercise');
		const maxes  = store.peekAll('max').filterBy('isNew', false);
		const workout = store.peekAll('workout').find(workout => workout.get('clientId') === workoutClientId);

		return { exercises, maxes, workout };
	}
});
