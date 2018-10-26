import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({

	queryParams: ['setClientId', 'exerciseClientId'],
	setClientId: null,
	exerciseClientId: null,

	exerciseSet: alias('model.exerciseSet'),
	maxes: alias('model.maxes'),

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
			const exerciseSet = this.get('exerciseSet');
			this.backToWorkout(exerciseSet.get('exercise.workout.id'), exerciseSet.get('exercise.workout.clientId'));
		},

		updateSet() {
			const workoutId = this.get('exerciseSet.exercise.workout.id');
			const workoutClientId = this.get('exerciseSet.exercise.workout.clientId');
			this.backToWorkout(workoutId, workoutClientId);
		},

		cancelSet() {

			const exerciseSet = this.get('exerciseSet');

			//Need to capture the workout id before rolling back the attributes. If the set passed to this controller
			//is new, rolling back the attributes will delete the record thus we lose all the values on it.
			const workoutId = exerciseSet.get('exercise.workout.id');
			const workoutClientId = exerciseSet.get('exercise.workout.clientId');

			exerciseSet.rollbackAttributes();

			this.backToWorkout(workoutId, workoutClientId);
		}
	}

});
