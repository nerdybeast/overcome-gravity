import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({

	queryParams: ['setClientId', 'exerciseClientId'],
	setClientId: null,
	exerciseClientId: null,

	exerciseSet: alias('model.exerciseSet'),
	maxes: alias('model.maxes'),
	workoutId: alias('exerciseSet.exercise.workout.id'),
	workoutClientId: alias('exerciseSet.exercise.workout.clientId'),

	backToWorkout(workoutId, workoutClientId) {
		workoutId = workoutId || 'new';
		this.transitionToRoute('workout', workoutId, {
			queryParams: {
				workoutClientId
			}
		});
	},

	actions: {

		saveSet() {
			this.backToWorkout(this.workoutId, this.workoutClientId);
		},

		updateSet() {
			this.backToWorkout(this.workoutId, this.workoutClientId);
		},

		cancelSet() {

			//Need to capture the workout id before rolling back the attributes. If the set passed to this controller
			//is new, rolling back the attributes will delete the record thus we lose all the values on it.
			const workoutId = this.workoutId;
			const workoutClientId = this.workoutClientId;

			this.exerciseSet.rollbackAttributes();

			this.backToWorkout(workoutId, workoutClientId);
		}
	}

});
