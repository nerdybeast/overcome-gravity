import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { alias, sort } from '@ember/object/computed';

export default Component.extend(ComponentValidateMixin, {

	workout: null,

	init() {
		this._super(...arguments);
		this.validateArguments('workout-overview', ['workout']);
	},

	exercises: alias('workout.exercises'),

	exercisesSortAsc: Object.freeze(['order']),
	sortedExercises: sort('exercises', 'exercisesSortAsc'),
});
