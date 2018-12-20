import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { inject as service } from '@ember/service';
import { equal, sort } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend(ComponentValidateMixin, {

	exercise: null,
	maxes: null,
	goToSetRoute: null,
	onDelete: null,

	init() {
		this._super(...arguments);
		this.validateArguments('exercise-form', ['exercise', 'maxes']);
	},

	store: service('store'),
	activeMaxId: null,
	setModel: null,

	isStandard: equal('exercise.type', 'standard'),
	isPercent: equal('exercise.type', 'percent'),

	setSortingAsc: Object.freeze(['order']),
	sets: sort('exercise.sets', 'setSortingAsc'),

	deleteSets: task(function * () {
		yield this.onDelete();
	}).drop(),

	actions: {

		addSet() {
			this.goToSetRoute('new', undefined, this.get('exercise.clientId'));
		},

		editSet(theSet) {
			this.goToSetRoute(theSet, theSet.get('clientId'), this.get('exercise.clientId'));
		},

		deleteSet(theSet) {
			return theSet.destroyRecord();
		}
	}
});
