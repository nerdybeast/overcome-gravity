import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import M from 'materialize-css';
import { equal } from '@ember/object/computed';

export default Component.extend(ComponentValidateMixin, {

	exercise: null,
	maxes: null,

	init() {
		this._super(...arguments);
		this.validateArguments('exercise-form', ['exercise', 'maxes']);
	},

	store: service('store'),
	activeMaxId: null,
	setModel: null,

	isStandard: equal('exercise.type', 'standard'),
	isPercent: equal('exercise.type', 'percent'),

	modalId: computed('elementId', function() {
		return `${this.get('elementId')}-modal`;
	}),

	getModalElement() {
		return document.getElementById(this.get('modalId'));
	},

	getModalInstance() {
		return M.Modal.getInstance(this.getModalElement());
	},

	actions: {

		addSet() {
			this.get('goToSetRoute')('new', undefined, this.get('exercise.clientId'));
		},

		editSet(theSet) {
			this.get('goToSetRoute')(theSet.get('id'), theSet.get('clientId'), this.get('exercise.clientId'));
		},

		deleteSet(theSet) {
			//TODO: theSet.delete()
			this.get('store').unloadRecord(theSet);
		}
	},

	didInsertElement() {
		M.Modal.init(this.getModalElement(), {
			dismissible: false
		});
	},

	willDestroyElement() {
		const instance = this.getModalInstance();
		if(instance) instance.destroy();
	}
});
