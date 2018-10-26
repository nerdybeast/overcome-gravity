import Component from '@ember/component';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { inject as service } from '@ember/service';
import M from 'materialize-css';

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

	actions: {

		addExercise(id) {
			this.goToExerciseRoute(id, null);
		},

		saveWorkout() {

			let errors = [];
			this.set('hasSubmittedForm', true);

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
