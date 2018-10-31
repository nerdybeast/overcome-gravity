import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import M from 'materialize-css';

export default Component.extend(ComponentValidateMixin, {

	exerciseName: null,
	recommendedExerciseName: null,
	selectedMaxClientId: null,
	exerciseType: 'percent',
	maxes: null,
	onSave: null,
	onCancel: null,
	onNewMax: null,

	init() {

		this._super(...arguments);

		if(!isBlank(this.selectedMaxClientId)) {
			this.set('selectedMax', this.maxes.findBy('clientId', this.selectedMaxClientId));
		}
	},

	selectedMax: null,

	isPercentBasedExercise: equal('exerciseType', 'percent'),

	defaultExerciseName: computed('recommendedExerciseName', 'selectedMax', function() {
		return this.selectedMax !== null ? this.selectedMax.get('name') : this.recommendedExerciseName;
	}),

	actions: {

		maxLiftChange(max) {

			if(max.get('isNew')) {
				this.onNewMax(max);
				return;
			}

			this.set('selectedMax', max);
		},

		saveNewExercise() {

			if(this.isPercentBasedExercise && isBlank(this.selectedMax)) {
				M.toast({html: 'Please select a max'});
				return;
			}

			if(isBlank(this.exerciseName)) {
				this.set('exerciseName', this.defaultExerciseName);
			}

			this.onSave(this.exerciseName, this.exerciseType, this.selectedMax);
			this.set('exerciseName', null);

			//Clear the selected max so that the next time this form is opened, the previous max isn't already selected.
			this.set('selectedMax', null);
		},

		cancel() {
			this.onCancel();
		}

	}

});
