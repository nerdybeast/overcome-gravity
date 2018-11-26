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
		maxId: {
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
		const maxes = store.peekAll('max');
		const workout = store.peekAll('workout').find(workout => workout.get('clientId') === workoutClientId);

		return { exercises, maxes, workout };
	},

	afterModel(model) {
		
		//We shouldn't be adding an exercise to a workout that doesn't exist so transition the user back to the workouts list.
		if(!model.workout) {
			this.transitionTo('workouts');
		}
	}
});
