import Component from '@ember/component';
import { inject as service } from "@ember/service";
import M from 'materialize-css';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { isBlank } from '@ember/utils';
import { reject, resolve } from 'rsvp';
import { task } from 'ember-concurrency';

export default Component.extend(ComponentValidateMixin, {

	store: service('store'),

	weight: null,
	max: null,
	recommendedReps: 1,
	isCompact: false,
	onSave: null,
	onComplete: null,
	onCancel: null,

	init() {

		this._super(...arguments);
		this.validateArguments('max-form', ['max', 'onSave', 'onComplete', 'onCancel']);

		this.set('maxes', this.get('store').peekAll('max').rejectBy('clientId', this.max.get('clientId')));
	},

	maxes: null,

	//Set to whatever weight type option the user selects
	//NOTE: This is not bound to those radio buttons, this is set manually
	weightType: 'kg',

	triggerNameValidation: 0,
	nameHasError: false,
	nameErrorMessage: null,

	validateFieldHasValue(val) {
		if(isBlank(val)) return reject('A value is required.');
		return resolve();
	},

	willInsertElement() {

		//TODO: Get from user's preferences...
		const isKG = true;

		let weight = isKG ? this.max.get('kg') : this.max.get('lbs');

		//Set the weight to null so that the input has a "blank" value instead of a 0 so that when the user
		//focuses on the input, they don't have to delete the 0 in order to set a value.
		if(this.max.get('isNew') && weight === 0) {
			weight = null;
		}

		this.set('weight', weight);
	},

	didInsertElement() {

		//If this component was rendered with a max already set, we need to update the Materialize input fields
		//to push the placeholder above the input so they don't run on top of the input value.
		if(!this.max.get('isNew')) {
			M.updateTextFields();
		}

	},

	willDestroyElement() {

		if(this.max.get('isNew')) {

			//TODO: Warn the user about unsaved changes...
			this.max.rollbackAttributes();
		}
	},

	validateNameField(val) {

		const maxName = (val || '').toLowerCase();
		const existingMaxNames = this.maxes.map(max => max.get('name').toLowerCase());

		let message = null;

		if(isBlank(maxName)) {
			message = 'Name is required';
		} else if(existingMaxNames.includes(maxName)) {
			message = `A max with the name "${val}" already exists.`;
		}

		const hasError = !isBlank(message);

		return { hasError, message };
	},

	maxWeightChange(kg, lbs) {
		this.max.setProperties({ kg, lbs });
	},

	saveMax: task(function * () {

		try {

			if(isBlank(this.weight)) {
				this.maxWeightChange(0, 0);
			}

			if(isBlank(this.max.get('reps'))) {
				this.max.set('reps', this.recommendedReps);
			}

			const validations = [];

			const nameValidation = this.validateNameField(this.max.get('name'));

			validations.push(nameValidation);

			this.setProperties({
				nameHasError: nameValidation.hasError,
				nameErrorMessage: nameValidation.message,
			});

			if(validations.any(x => x.hasError)) {
				return;
			}

			yield this.onSave(this.max);
			yield this.onComplete();

		} catch(error) {
			//TODO: Show error to user
		}

	}).drop(), //drop prevents firing this function if it's already running, i.e. prevents double button clicks

	actions: {

		cancel() {
			this.max.rollbackAttributes();
			this.onCancel();
		},

		weightTypeChange(weightType) {
			this.set('weightType', weightType);
		},

		maxLiftNameChange(val) {

			const { hasError, message } = this.validateNameField(val);

			this.setProperties({
				nameHasError: hasError,
				nameErrorMessage: message
			});
		},

		maxLiftWeightChange({ kg, lbs }) {
			this.maxWeightChange(kg, lbs);
		}
	}
});
