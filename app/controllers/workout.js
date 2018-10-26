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
		return this.get('workout.isNew') ? 'Create Workout' : 'Edit Workout';
	}),

	isEditing: equal('mode', 'edit'),

	defaultWorkoutName: computed('workouts.[]', function() {
		// const workouts = this.get('store').peekAll('workout');
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

		goToExerciseRoute(exerciseId, exerciseClientId, workoutClientId) {

			exerciseId = exerciseId || 'unsaved';

			this.transitionToRoute('exercise', exerciseId, {
				queryParams: {
					exerciseClientId,
					workoutClientId
				}
			});
		},

		saveWorkout() {

			const workout = this.get('workout');
			const exercises = workout.get('exercises');

			const workoutPromise = workout.get('hasDirtyAttributes') ? workout.save() : resolve(workout);

			workoutPromise.then(() => {

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

			const workout = this.get('workout');

			workout.get('exercises').forEach(exercise => {
				exercise.get('sets').forEach(theSet => theSet.rollbackAttributes());
				exercise.rollbackAttributes();
			});

			workout.rollbackAttributes();
			this.transitionToRoute('workouts');
		}
	}
});
