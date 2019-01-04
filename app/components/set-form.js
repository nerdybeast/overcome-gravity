import Component from '@ember/component';
import { computed } from '@ember/object';
import SelectInputOption from 'overcome-gravity/models/objects/select-input-option';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { isBlank } from '@ember/utils';
import M from 'materialize-css';
import { alias, equal } from '@ember/object/computed';

export default Component.extend(ComponentValidateMixin, {

	exerciseSet: null,
	exerciseName: null,
	maxes: null,
	activeMaxId: null,
	weightType: 'kg',

	//passed functions
	saveSet: null,
	updateSet: null,
	cancelSet: null,

	init() {
		this._super(...arguments);
		this.validateArguments('set-form', ['exerciseSet', 'maxes']);

		if(this.exerciseSet !== null && this.get('activeMaxId') === null) {
			this.set('activeMaxId', this.exerciseSet.get('max.id') || null);
		}
	},

	exercise: alias('exerciseSet.exercise'),
	max: alias('exercise.max'),
	recommendedReps: 1,
	recommendedPercent: 50,
	recommendedRepeatCount: 1,

	setFormTitle: computed('exerciseName', 'exerciseSet.order', function() {
		return `${this.exerciseName} - Set ${this.exerciseSet.get('order')}`;
	}),

	setFormSubTitle: computed('isPercent', function() {
		return this.isPercent ? `Of ${this.max.get('name')} max` : null;
	}),

	isPercent: equal('exercise.type', 'percent'),

	weight: computed('isPercent', 'max', 'exerciseSet', 'weightType', function() {

		if(this.isPercent) {
			//TODO: Need to pull kg or lbs based on the user's preference...
			return this.max.get(this.weightType);
		}

		let weightAmount = this.exerciseSet.get(this.weightType) || 0;

		//Set the weight to null so that the input has a "blank" value instead of a 0 so that when the user
		//focuses on the input, they don't have to delete the 0 in order to set a value.
		if(this.exerciseSet.get('isNew') && weightAmount === 0) {
			weightAmount = null;
		}

		return weightAmount;
	}),

	isValid() {

		const errors = [];

		if(isBlank(this.exerciseSet.get('reps'))) {
			this.exerciseSet.set('reps', this.recommendedReps);
		}

		if(this.isPercent) {

			if(isBlank(this.exerciseSet.get('percent'))) {
				this.exerciseSet.set('percent', this.recommendedPercent);
			}
	
			if(isBlank(this.max)) {
				errors.push('Please enter a max.');
			}

		}
		
		if(isBlank(this.exerciseSet.get('repeatCount'))) {
			this.exerciseSet.set('repeatCount', this.recommendedRepeatCount);
		}

		if(errors.length > 0) {

			M.toast({
				html: errors.join('\n')
			});

			return false;
		}

		return true;
	},

	setWeight(kg, lbs) {
		this.exerciseSet.setProperties({ kg, lbs });
	},

	actions: {

		onSaveSet() {

			if(this.isValid()) {

				if((isBlank(this.exerciseSet.get('kg')) || isBlank(this.exerciseSet.get('lbs'))) && this.weight === 0) {
					this.setWeight(0, 0);
				}

				if(this.exerciseSet.get('type') !== this.exercise.get('type')) {
					this.exerciseSet.set('type', this.exercise.get('type'));
				}

				this.saveSet();
			}
		},

		onUpdateSet() {
			if(this.isValid()) {
				this.updateSet();
			}
		},

		onCancelSet() {
			this.cancelSet();
		},

		weightChange({ kg, lbs }) {
			this.setWeight(kg, lbs);
		}
	}
});
