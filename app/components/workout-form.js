import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, sort } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { inject as service } from '@ember/service';
import M from 'materialize-css';
import { task } from 'ember-concurrency';

export default Component.extend(ComponentValidateMixin, {

	workout: null,
	maxes: null,
	defaultWorkoutName: null,
	goToSetRoute: null,
	goToExerciseRoute: null,
	onSaveWorkout: null,
	onCancelWorkout: null,

	init() {
		this._super(...arguments);
		this.validateArguments('workout-form', ['workout', 'maxes']);
	},

	store: service('store'),
	exercises: alias('workout.exercises'),

	exercisesSortAsc: Object.freeze(['order']),
	sortedExercises: sort('exercises', 'exercisesSortAsc'),

	workoutIsDirty: computed('workout', function() {

		const workoutIsDirty = this.workout.get('hasDirtyAttributes');

		if(workoutIsDirty) {
			return true;
		}

		const exercises = this.workout.get('exercises');
		const exercisesAreDirty = exercises.isAny('hasDirtyAttributes');

		if(exercisesAreDirty) {
			return true;
		}

		const exerciseWithDirtySets = exercises.find(exercise => exercise.get('sets').isAny('hasDirtyAttributes'));

		if(exerciseWithDirtySets) {
			return true;
		}

		return false;
	}),

	hasSubmittedForm: false,

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

	didInsertElement() {
		M.Modal.init(this.getModalElement('cancelWorkoutModalId'));
	},

	willDestroyElement() {
		this.getModalInstance('cancelWorkoutModalId').destroy();
	},

	saveWorkout: task(function * () {

		try {

			this.set('hasSubmittedForm', true);

			if(isBlank(this.workout.get('name'))) {
				//TODO: Setting this makes the input field reflect this value but the label doesn't move to the top of the input.
				this.workout.set('name', this.defaultWorkoutName);
			}

			yield this.onSaveWorkout();

		} catch(error) {

			M.toast({
				html: error.message
			});
		}

	}).drop(),

	actions: {

		addExercise(id) {

			if(this.saveWorkout.isRunning) {
				return;
			}

			this.goToExerciseRoute(id, null);
		},

		cancelWorkoutConfirm() {

			if(this.workoutIsDirty) {
				this.openModal('cancelWorkoutModalId');
				return;
			}

			this.onCancelWorkout();
		},

		abortCancel() {
			this.closeModal('cancelWorkoutModalId');
		}
	}
});
