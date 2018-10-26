import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import SelectInputOption from 'overcome-gravity/models/objects/select-input-option';
import { isBlank } from '@ember/utils';
import { resolve, reject } from 'rsvp';
import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import M from 'materialize-css';

export default Component.extend(ComponentValidateMixin, {

	exerciseName: null,
	defaultExerciseName: null,
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

	validateFieldHasValue(val) {
		if(isBlank(val)) return reject('A value is required.');
		return resolve();
	},

	actions: {

		maxLiftChange(max) {

			if(max.get('isNew')) {
				this.onNewMax(max);
				return;
			}

			this.set('selectedMax', max);
		},

		saveNewExercise() {

			// this.set('exerciseNameHasError', false);
			// this.set('exerciseNameErrorMessage', null);

			if(this.isPercentBasedExercise && isBlank(this.selectedMax)) {
				M.toast({html: 'Please select a max'});
				return;
			}

			if(isBlank(this.exerciseName)) {
				this.set('exerciseName', this.defaultExerciseName);
			}
			// const { exerciseName, exerciseType, maxId } = this.getProperties('exerciseName', 'exerciseType', 'maxId');

			// this.validateFieldHasValue(exerciseName).then(() => {

				this.get('onSave')(this.exerciseName, this.exerciseType, this.selectedMax);
				this.set('exerciseName', null);

				// this.set('exerciseNameHasError', false);
				// this.set('exerciseNameErrorMessage', null);

			// }).catch(() => {

			// 	this.set('exerciseNameHasError', true);
			// 	this.set('exerciseNameErrorMessage', 'Exercise name is required.');
			// 	this.incrementProperty('triggerNameValidation');

			// });

		},

		cancel() {
			this.get('onCancel')();
		}

	}

});
