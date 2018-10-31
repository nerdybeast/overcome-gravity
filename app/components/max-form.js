import Component from '@ember/component';
import { inject as service } from "@ember/service";
import M from 'materialize-css';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { isBlank } from '@ember/utils';
import { reject, resolve } from 'rsvp';
import { task } from 'ember-concurrency';

export default Component.extend(ComponentValidateMixin, {

	store: service('store'),

	max: null,
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

		const weight = isKG ? this.max.get('kg') : this.max.get('lbs');

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

	validateWeightField(val) {

		const hasError = isBlank(val);
		const message = hasError ? 'Weight is required' : null;

		return { hasError, message };
	},

	saveMax: task(function * () {

		try {

			const max = this.get('max');
			const validations = [];

			const nameValidation = this.validateNameField(max.get('name'));
			const weightValidation = this.validateWeightField(this.get('weight'));

			validations.push(nameValidation);
			validations.push(weightValidation);

			this.setProperties({
				nameHasError: nameValidation.hasError,
				nameErrorMessage: nameValidation.message,
				weightHasError: weightValidation.hasError,
				weightErrorMessage: weightValidation.message
			});

			if(validations.any(x => x.hasError)) {
				return;
			}

			yield this.onSave(max);
			yield this.onComplete();

		} catch(error) {
			//TODO: Show error to user
		}

	}).drop(), //drop prevents firing this function if it's already running, i.e. prevents double button clicks

	actions: {

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
			this.get('max').setProperties({ kg, lbs });
		}
	}
});
