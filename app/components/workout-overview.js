import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend(ComponentValidateMixin, {

	workout: null,
	preferences: null,
	onEdit: null,
	onDelete: null,

	init() {
		this._super(...arguments);
		this.validateArguments('workout-overview', ['workout']);
	},

	modal: service('modal'),

	deleteWorkoutModalId: computed('elementId', function() {
		return `${this.get('elementId')}-delete-workout-modal`;
	}),

	didInsertElement() {
		this.modal.create(this.deleteWorkoutModalId);
	},

	willDestroyElement() {
		this.modal.destroy(this.deleteWorkoutModalId);
	},

	actions: {

		deleteWorkoutConfirm() {
			this.modal.open(this.deleteWorkoutModalId);
		},

		cancelWorkoutDeletion() {
			this.modal.close(this.deleteWorkoutModalId);
		},

		deleteWorkout() {
			this.modal.close(this.deleteWorkoutModalId);
			this.onDelete();
		}
	}
});
