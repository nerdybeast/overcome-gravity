import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed, observer } from '@ember/object';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';

export default Controller.extend({

	queryParams: [
		'exerciseClientId',
		'workoutClientId',
		'maxId',
		'presetExerciseName'
	],

	exerciseClientId: null,

	//Needed for when a new exercise is being created, the model hook needs to look up the workout to link the exercise to.
	workoutClientId: null,

	maxId: null,
	presetExerciseName: null,

	//Passed to the "new exercise form"
	exerciseName: null,

	//Set in setupController
	defaultWorkoutName: null,

	exercise: alias('model'),
	workout: alias('exercise.workout'),
	
	//Set in setupController, this is all exercises in the app, not just the ones related to the parent workout.
	exercises: A(),
	maxes: A(),

	recommendedExerciseName: computed('exercises.@each.name', function() {
		return `Exercise ${this.workout.get('exercises.length')}`;
	}),

	currentExerciseOrderNumber: computed('workout.exercises.[]', function() {
		return this.workout.get('exercises').reduce((prev, curr) => {
			return curr.order > prev ? curr.order : prev;
		}, 0);
	}),

	exerciseNameObserver: observer('presetExerciseName', 'exerciseName', function() {
		if(!isBlank(this.presetExerciseName) && isBlank(this.exerciseName)) {
			this.set('exerciseName', this.presetExerciseName);
			this.set('presetExerciseName', null);
		}
	}),

	transitionToWorkoutRoute(workout) {

		this.set('exerciseName', null);

		this.transitionToRoute('workout', workout, {
			queryParams: {
				mode: 'edit'
			}
		});
	},

	actions: {

		addNewExercise(exerciseName, exerciseType, max) {

			this.exercise.setProperties({
				name: exerciseName,
				type: exerciseType,
				order: this.currentExerciseOrderNumber + 1,
				max
			});

			this.transitionToWorkoutRoute(this.workout);
		},

		cancelExercise() {
			const workout = this.exercise.get('workout');
			this.exercise.rollbackAttributes();
			this.transitionToWorkoutRoute(workout);
		},

		addNewMax() {
			this.transitionToRoute('max', 'new', {
				queryParams: {
					maxId: null,
					exerciseClientId: this.exercise.get('clientId'),
					exerciseName: this.exercise.get('name')
				}
			});
		}
	}
});
