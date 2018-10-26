import Component from '@ember/component';
import { inject as service } from "@ember/service";
import M from 'materialize-css';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { isBlank } from '@ember/utils';
import { reject, resolve, hashSettled } from 'rsvp';

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

		const currentMax = this.get('max');
		this.set('maxes', this.get('store').peekAll('max').rejectBy('clientId', currentMax.get('clientId')));
	},

	maxes: null,

	//Bound to the weight number input
	// weight: null,

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
		// const isKG = this.get('isKG');
		const isKG = true;

		// this.set('weight', isKG ? max.get('kg') : max.get('lbs'));
		this.set('weight', isKG ? this.max.get('kg') : this.max.get('lbs'));
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

	actions: {

		weightTypeChange(weightType) {
			this.set('weightType', weightType);
		},

		maxLiftNameChange(val) {
			
			const maxName = (val || '').toLowerCase();
			const existingMaxNames = this.maxes.map(max => max.get('name').toLowerCase());
			
			if(existingMaxNames.includes(maxName)) {

				this.setProperties({
					nameHasError: true,
					nameErrorMessage: `A max with the name "${val}" already exists.`
				});

			}

			this.setProperties({
				nameHasError: false,
				nameErrorMessage: null
			});
		},

		maxFormSubmit() {
		
			const max = this.get('max');
			const name = this.validateFieldHasValue(max.get('name'));
			const weight = this.validateFieldHasValue(this.get('weight'));

			hashSettled({ name, weight }).then(res => {

				if(res.name.state === 'rejected') this.incrementProperty('triggerNameValidation');
				if(res.weight.state === 'rejected') this.incrementProperty('triggerWeightValidation');

				if(Object.keys(res).every(key => res[key].state === 'fulfilled')) {
					this.get('onSave')(max).then(() => this.get('onComplete')());
				}

			});
		},

		maxLiftWeightChange({ kg, lbs }) {
			this.get('max').setProperties({ kg, lbs });
		}
	}
});
