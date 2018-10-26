import Component from '@ember/component';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { inject as service } from '@ember/service';
// import { uuid } from 'ember-cli-uuid';
import M from 'materialize-css';

export default Component.extend(ComponentValidateMixin, {

	workout: null,
	maxes: null,
	defaultWorkoutName: null,

	init() {

		this._super(...arguments);

		this.validateArguments('workout-form', ['workout', 'maxes']);

		this.set('workoutValidationInput_name', {
			hasError: false,
			message: ''
		});
	},

	store: service('store'),

	hasSubmittedForm: false,
	// triggerNameValidation: 0,

	// workoutNameHasError: computed('workout.name', 'hasSubmittedForm', function() {
	// 	return isBlank(this.get('workout.name')) && this.get('hasSubmittedForm');
	// }),

	// workoutNameErrorMessage: computed('workoutNameHasError', function() {
	// 	return this.get('workoutNameHasError') ? 'Workout name is required.' : '';
	// }),

	workoutNameHelpText: computed('defaultWorkoutName', function() {
		return `Defaults to ${this.defaultWorkoutName}`;
	}),

	// newExerciseModalId: computed('elementId', function() {
	// 	return `new-exercise-modal-${this.get('elementId')}`;
	// }),

	cancelWorkoutModalId: computed('elementId', function() {
		return `cancel-modal-${this.get('elementId')}`;
	}),

	getModalElement(modalId) {
		return document.getElementById(this.get(modalId));
	},

	getModalInstance(modalId) {
		const modalElement = this.getModalElement(modalId);
		return M.Modal.getInstance(modalElement);
	},

	openModal(modalId) {
		this.getModalInstance(modalId).open();
	},

	closeModal(modalId) {
		this.getModalInstance(modalId).close();
	},

	// currentExerciseOrderNumber: computed('workout.exercises.[]', function() {
	// 	return this.get('workout.exercises').reduce((prev, curr) => {
	// 		return curr.order > prev ? curr.order : prev;
	// 	}, 0);
	// }),

	// defaultExerciseName: computed('workout.exercises.@each.name', function() {
	// 	const defaultExercisesCount = this.workout.get('exercises').filter(exercise => exercise.getWithDefault('name', '').toLowerCase().startsWith('exercise ')).length;
	// 	return `Exercise ${defaultExercisesCount + 1}`;
	// }),

	didInsertElement() {
		// M.Modal.init(this.getModalElement('newExerciseModalId'));
		M.Modal.init(this.getModalElement('cancelWorkoutModalId'));
	},

	willDestroyElement() {

		[/*'newExerciseModalId',*/ 'cancelWorkoutModalId'].forEach(key => {
			this.getModalInstance(key).destroy();
		});
	},

	actions: {

		addExercise(id) {
			// this.openModal('newExerciseModalId');
			this.goToExerciseRoute(id, null, this.workout.get('clientId'));
		},

		// cancelExercise() {
		// 	this.closeModal('newExerciseModalId');
		// },

		// addNewExercise(exerciseName, exerciseType, maxId) {

		// 	const store = this.get('store');
		// 	const clientId = uuid();

		// 	const max = this.get('maxes').findBy('id', maxId);

		// 	const newExercise = store.createRecord('exercise', {
		// 		clientId,
		// 		name: exerciseName,
		// 		type: exerciseType,
		// 		order: this.get('currentExerciseOrderNumber') + 1,
		// 		workout: this.get('workout'),
		// 		max
		// 	});

		// 	this.get('workout.exercises').pushObject(newExercise);
		// 	this.closeModal('newExerciseModalId');
		// },

		saveWorkout() {

			let errors = [];
			this.set('hasSubmittedForm', true);

			// if(this.get('workoutNameHasError')) {
			// 	this.incrementProperty('triggerNameValidation');
			// 	errors.push(this.get('workoutNameErrorMessage'));
			// }

			if(isBlank(this.workout.get('name'))) {
				//TODO: Setting this makes the input field reflect this value but the label doesn't move to the top of the input.
				this.workout.set('name', this.defaultWorkoutName);
			}

			if(errors.length > 0) {

				M.toast({
					html: errors.join('\n')
				});

				return;
			}

			this.get('onSaveWorkout')();
		},

		cancelWorkoutConfirm() {
			this.openModal('cancelWorkoutModalId');
		},

		abortCancel() {
			this.closeModal('cancelWorkoutModalId');
		}
	}
});
