import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { uuid } from 'ember-cli-uuid';

export default Controller.extend({

	queryParams: ['exerciseClientId', 'workoutClientId', 'maxId'],
	exerciseClientId: null,
	workoutClientId: null,
	maxId: null,

	workout: alias('model.workout'),
	exercises: alias('model.exercises'),
	maxes: alias('model.maxes'),

	defaultExerciseName: computed('exercises.@each.name', function() {
		const defaultExercisesCount = this.exercises.filter(exercise => exercise.getWithDefault('name', '').toLowerCase().startsWith('exercise ')).length;
		return `Exercise ${defaultExercisesCount + 1}`;
	}),

	currentExerciseOrderNumber: computed('workout.exercises.[]', function() {
		return this.workout.get('exercises').reduce((prev, curr) => {
			return curr.order > prev ? curr.order : prev;
		}, 0);
	}),

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
			const workoutId = this.workout.get('id') || 'new';

			this.transitionToRoute('workout', workoutId, {
				queryParams: {
					workoutClientId: this.workout.get('clientId')
				}
			});
		},

		cancelExercise() {

		},

		addNewMax(max) {
			this.transitionToRoute('max', 'new', {
				queryParams: {
					maxClientId: max.get('clientId'),
					exerciseClientId: this.exerciseClientId,
					workoutClientId: this.workoutClientId
				}
			});
		}
	}
});
