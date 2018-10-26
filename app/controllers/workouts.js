import Controller from '@ember/controller';
import { alias, filterBy } from '@ember/object/computed';

export default Controller.extend({
	workouts: alias('model'),
	savedWorkouts: filterBy('workouts', 'isNew', false),
	actions: {
		goToWorkout(workoutId) {
			this.transitionToRoute('workout', workoutId, {
				queryParams: {
					//If coming from this view where the user sees all their workouts, we don't want one to already be in "edit" mode.
					mode: null
				}
			});
		}
	}
});
