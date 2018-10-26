import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { inject as service } from '@ember/service';
import { equal } from '@ember/object/computed';

export default Component.extend(ComponentValidateMixin, {

	exercise: null,
	maxes: null,
	goToSetRoute: null,

	init() {
		this._super(...arguments);
		this.validateArguments('exercise-form', ['exercise', 'maxes']);
	},

	store: service('store'),
	activeMaxId: null,
	setModel: null,

	isStandard: equal('exercise.type', 'standard'),
	isPercent: equal('exercise.type', 'percent'),

	actions: {

		addSet() {
			this.goToSetRoute('new', undefined, this.get('exercise.clientId'));
		},

		editSet(theSet) {
			this.goToSetRoute(theSet.get('id'), theSet.get('clientId'), this.get('exercise.clientId'));
		},

		deleteSet(theSet) {
			//TODO: theSet.delete()
			this.get('store').unloadRecord(theSet);
		}
	}
});
