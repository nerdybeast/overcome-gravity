import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

	init() {
		this._super(...arguments);
		this.set('exerciseGroups', []);
	},

	exerciseGroups: null,

	currentExerciseGroupOrderNumber: computed('exerciseGroups.[]', function() {
		return this.get('exerciseGroups').reduce((prev, curr) => {
			return curr.order > prev ? curr.order : prev;
		}, 0);
	}),

	actions: {

		addExerciseGroup() {
			this.get('exerciseGroups').pushObject({
				order: this.get('currentExerciseGroupOrderNumber') + 1,
				exercises: [{
					order: 1,
					sets: 1,
					reps: 1
				}]
			});
		}

	}

});
