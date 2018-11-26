import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed, observer } from '@ember/object';
import { uuid } from 'ember-cli-uuid';
import { isBlank } from '@ember/utils';

export default Controller.extend({

	queryParams: ['exerciseClientId', 'workoutClientId', 'maxId', 'presetExerciseName'],
	exerciseClientId: null,
	workoutClientId: null,
	maxId: null,
	presetExerciseName: null,

	//Passed to the "new exercise form"
	exerciseName: null,

	workout: alias('model.workout'),
	
	//This is all exercises in the app, not just the ones related to the parent workout.
	exercises: alias('model.exercises'),
	maxes: alias('model.maxes'),

	recommendedExerciseName: computed('exercises.@each.name', function() {
		return `Exercise ${this.workout.get('exercises.length') + 1}`;
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

	transitionToWorkoutRoute() {

		const workoutId = this.workout.get('id') || 'new';

		const queryParams = {
			workoutClientId: this.workout.get('clientId'),
			mode: 'edit'
		};

		this.set('exerciseName', null);

		this.transitionToRoute('workout', workoutId, { queryParams });
	},

	actions: {

		addNewExercise(exerciseName, exerciseType, max) {

			const store = this.get('store');
			const clientId = uuid();

			const newExercise = store.createRecord('exercise', {
				clientId,
				name: exerciseName,
				type: exerciseType,
				order: this.currentExerciseOrderNumber + 1,
				workout: this.workout,
				max
			});

			this.workout.get('exercises').pushObject(newExercise);
			this.transitionToWorkoutRoute();
		},

		cancelExercise() {
			this.transitionToWorkoutRoute();
		},

		addNewMax() {
			this.transitionToRoute('max', 'new', {
				queryParams: {
					maxId: null,
					exerciseClientId: this.exerciseClientId,
					workoutClientId: this.workoutClientId,
					exerciseName: this.exerciseName
				}
			});
		}
	}
});
