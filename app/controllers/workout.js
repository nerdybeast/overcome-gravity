import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias, equal } from '@ember/object/computed';
import { Promise, resolve } from 'rsvp';

export default Controller.extend({

	queryParams: ['workoutClientId', 'mode'],
	workoutClientId: null,
	mode: null,

	workout: alias('model'),
	maxes: null,
	workouts: null,

	pageTitle: computed('workout.isNew', function() {
		return this.workout.get('isNew') ? 'Create Workout' : 'Edit Workout';
	}),

	isEditing: equal('mode', 'edit'),

	defaultWorkoutName: computed('workouts.[]', function() {
		const numberOfDefaultWOrkouts = this.workouts.filter(workout => workout.getWithDefault('name', '').toLowerCase().startsWith('workout ')).length;
		return `Workout ${numberOfDefaultWOrkouts + 1}`;
	}),

	actions: {

		goToSetRoute(setId, setClientId, exerciseClientId) {
			
			setId = setId || 'unsaved';
			
			this.transitionToRoute(`set`, setId, {
				queryParams: {
					setClientId,
					exerciseClientId
				}
			});
		},

		goToExerciseRoute(exerciseId, exerciseClientId/*, workoutClientId*/) {

			exerciseId = exerciseId || 'unsaved';
			const workoutClientId = this.workout.get('clientId');

			this.transitionToRoute('exercise', exerciseId, {
				queryParams: {
					exerciseClientId,
					workoutClientId
				}
			});
		},

		saveWorkout() {

			const exercises = this.workout.get('exercises');

			const workoutPromise = this.workout.get('hasDirtyAttributes') ? this.workout.save() : resolve(this.workout);

			return workoutPromise.then(() => {

				const exercisesPromises = exercises.map(exercise => exercise.get('hasDirtyAttributes') ? exercise.save() : resolve(exercise));
				return Promise.all(exercisesPromises);

			}).then(() => {

				const sets = [];

				exercises.forEach(exercise => {
					exercise.get('sets').forEach(theSet => sets.push(theSet));
				});

				const setsSavePromises = sets.map(theSet => theSet.get('hasDirtyAttributes') ? theSet.save() : resolve(theSet));

				return Promise.all(setsSavePromises);

			}).then(() => {
				this.set('workoutClientId', null);
				this.transitionToRoute('workouts');
			});

		},

		editWorkout(mode) {
			this.set('mode', mode);
		},

		cancelWorkoutCreation() {

			const sets = [];
			const exercises = [];

			this.workout.get('exercises').forEach(exercise => {

				exercise.get('sets').forEach(theSet => {
					sets.push(theSet);
				});

				exercises.push(exercise);
			});

			sets.forEach(theSet => theSet.rollbackAttributes());
			exercises.forEach(exercise => exercise.rollbackAttributes());
			this.workout.rollbackAttributes();

			this.transitionToRoute('workouts');
		}
	}
});
