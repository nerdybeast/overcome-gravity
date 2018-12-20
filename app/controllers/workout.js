import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias, equal } from '@ember/object/computed';
import { Promise, resolve } from 'rsvp';

export default Controller.extend({

	queryParams: ['mode'],
	mode: null,

	maxes: null,
	workouts: null,
	
	workout: alias('model'),
	exercises: alias('workout.exercises'),
	sets: computed('exercises.[]', function() {
		return this.exercises.reduce((sets, exercise) => {
			exercise.get('sets').forEach(s => sets.push(s));
			return sets;
		}, []);
	}),

	pageTitle: computed('workout.isNew', function() {
		return this.workout.get('isNew') ? 'Create Workout' : 'Edit Workout';
	}),

	isEditing: equal('mode', 'edit'),

	defaultWorkoutName: computed('workouts.[]', function() {
		const numberOfDefaultWOrkouts = this.workouts.filter(workout => workout.getWithDefault('name', '').toLowerCase().startsWith('workout ')).length;
		return `Workout ${numberOfDefaultWOrkouts + 1}`;
	}),

	getExercisesAndSets() {

		const sets = [];
		const exercises = [];

		this.workout.get('exercises').forEach(exercise => {

			exercise.get('sets').forEach(theSet => {
				sets.push(theSet);
			});

			exercises.push(exercise);
		});

		return { sets, exercises };
	},

	actions: {

		goToSetRoute(setIdentifier, setClientId, exerciseClientId) {

			if(typeof setIdentifier === 'string') {
				setIdentifier = setIdentifier || 'unsaved';
			}

			this.transitionToRoute(`set`, setIdentifier, {
				queryParams: {
					setClientId,
					exerciseClientId
				}
			});
		},

		goToExerciseRoute(exerciseId, exerciseClientId) {

			exerciseId = exerciseId || 'unsaved';

			this.transitionToRoute('exercise', exerciseId, {
				queryParams: {
					exerciseClientId,
					maxId: null,
					presetExerciseName: null,
					workoutId: this.workout.get('id'),
					workoutClientId: this.workout.get('clientId')
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
				this.set('mode', null);
				this.transitionToRoute('workout', this.workout.get('id'));
			});

		},

		editWorkout(mode) {
			this.set('mode', mode);
		},

		cancelWorkoutCreation() {

			//Need to capture this before rolling back the attributes
			const workoutIsNew = this.workout.get('isNew');

			const { sets, exercises } = this.getExercisesAndSets();

			sets.forEach(theSet => theSet.rollbackAttributes());
			exercises.forEach(exercise => exercise.rollbackAttributes());
			this.workout.rollbackAttributes();

			if(workoutIsNew) {
				return this.transitionToRoute('workouts');
			}

			this.set('mode', null);
		},

		deleteWorkout() {

			const { sets, exercises } = this.getExercisesAndSets();

			return this.workout.destroyRecord().then(() => {
				exercises.forEach(x => x.unloadRecord());
				sets.forEach(x => x.unloadRecord());
				this.transitionToRoute('workouts');
			});
		}
	}
});
