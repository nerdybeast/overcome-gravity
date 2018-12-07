import Component from '@ember/component';
import { computed } from '@ember/object';
import SelectInputOption from 'overcome-gravity/models/objects/select-input-option';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { isBlank } from '@ember/utils';
import M from 'materialize-css';
import { alias, equal } from '@ember/object/computed';

export default Component.extend(ComponentValidateMixin, {

	exerciseSet: null,
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

	maxAlreadyDetermined: computed('max', function() {
		return !isBlank(this.max);
	}),

	isPercent: equal('exercise.type', 'percent'),

	weight: computed('isPercent', 'max', 'exerciseSet', 'weightType', function() {

		if(this.isPercent) {
			//TODO: Need to pull kg or lbs based on the user's preference...
			return this.max.get(this.weightType);
		}

		return this.exerciseSet.get(this.weightType) || 0;
	}),

	maxesOptions: computed('maxes.[]', 'activeMaxId', 'maxAlreadyDetermined', function() {

		if(this.maxAlreadyDetermined) {

			return [SelectInputOption.create({
				value: this.max.get('id'),
				label: this.max.get('name'),
				selected: true,
				disabled: true
			})];
		}

		const maxes = this.maxes.map(max => {
			return SelectInputOption.create({
				value: max.id,
				label: max.name,
				selected: max.id === this.activeMaxId
			});
		});

		const readOnlyOption = SelectInputOption.create({
			label: 'Choose a max',
			disabled: true,
			selected: this.activeMaxId === null
		});

		return [readOnlyOption, ...maxes];
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

		} else {

			if(isBlank(this.weight)) {
				errors.push('Please enter the weight.');
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

		changeMaxOnSet(maxId) {
			this.exerciseSet.set('max', this.get('maxes').findBy('id', maxId));
		},

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
