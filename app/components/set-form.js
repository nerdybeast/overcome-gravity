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
	onSave: null,
	onCancel: null,

	init() {
		this._super(...arguments);
		this.validateArguments('set-form', ['exerciseSet', 'maxes']);

		const exerciseSet = this.get('exerciseSet');

		if(exerciseSet !== null && this.get('activeMaxId') === null) {
			this.set('activeMaxId', exerciseSet.get('max.id') || null);
		}
	},

	exercise: alias('exerciseSet.exercise'),
	max: alias('exercise.max'),

	maxAlreadyDetermined: computed('max', function() {
		return !isBlank(this.get('max'));
	}),

	isPercent: equal('exercise.type', 'percent'),

	weight: computed('isPercent', 'max', 'exerciseSet', 'weightType', function() {

		const isPercent = this.get('isPercent');
		const weightType = this.get('weightType');

		if(isPercent) {
			//TODO: Need to pull kg or lbs based on the user's preference...
			return this.get(`max.${weightType}`);
		}

		return this.get(`exerciseSet.${weightType}`) || 0;
	}),

	maxesOptions: computed('maxes.[]', 'activeMaxId', 'maxAlreadyDetermined', function() {

		const activeMaxId = this.get('activeMaxId');
		const maxAlreadyDetermined = this.get('maxAlreadyDetermined');

		if(maxAlreadyDetermined) {

			const max = this.get('max');

			return [SelectInputOption.create({
				value: max.get('id'),
				label: max.get('name'),
				selected: true,
				disabled: true
			})];
		}

		const maxes = this.get('maxes').map(max => {
			return SelectInputOption.create({
				value: max.id,
				label: max.name,
				selected: max.id === activeMaxId
			});
		});

		const readOnlyOption = SelectInputOption.create({
			label: 'Choose a max',
			disabled: true,
			selected: activeMaxId === null
		});

		return [readOnlyOption, ...maxes];
	}),

	isValid() {

		const errors = [];
		//const theSet = this.get('exerciseSet');

		if(isBlank(this.exerciseSet.get('reps'))) {
			errors.push('Please enter the number of reps.');
		}

		if(this.isPercent) {

			if(isBlank(this.exerciseSet.get('percent'))) {
				errors.push('Please enter the percent.');
			}
	
			if(isBlank(this.max)) {
				errors.push('Please enter a max.');
			}

		} else {

			if(isBlank(this.get('weight'))) {
				errors.push('Please enter the weight.');
			}
		}
		
		if(isBlank(this.exerciseSet.get('repeatCount'))) {
			this.exerciseSet.set('repeatCount', 1);
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
		this.get('exerciseSet').setProperties({ kg, lbs });
	},

	actions: {

		changeMaxOnSet(maxId) {
			const exerciseSet = this.get('exerciseSet');
			exerciseSet.set('max', this.get('maxes').findBy('id', maxId));
		},

		onSaveSet() {

			if(this.isValid()) {

				const exercise = this.get('exercise');
				const exerciseSet = this.get('exerciseSet');

				if((isBlank(exerciseSet.get('kg')) || isBlank(exerciseSet.get('lbs'))) && this.get('weight') === 0) {
					this.setWeight(0, 0);
				}

				if(exerciseSet.get('type') !== exercise.get('type')) {
					exerciseSet.set('type', exercise.get('type'));
				}

				this.get('saveSet')();
			}
		},

		onUpdateSet() {
			if(this.isValid()) {
				this.get('updateSet')();
			}
		},

		onCancelSet() {
			this.get('cancelSet')();
		},

		weightChange({ kg, lbs }) {
			this.setWeight(kg, lbs);
		}
	}
});
