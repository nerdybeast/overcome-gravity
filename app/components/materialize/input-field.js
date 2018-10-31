import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import M from 'materialize-css';
import { isEmpty } from '@ember/utils';
import { next } from '@ember/runloop';

export default Component.extend({
	
	type: 'text',
	inputId: null,
	value: null,
	label: null,

	min: null,
	max: null,
	step: null,

	inline: false,

	placeholder: null,
	helpText: null,
	hasSuccess: false,
	hasError: false,
	successMessage: 'Success',
	errorMessage: 'An error has occurred',

	triggerValidation: 0,
	onChange: null,

	classNames: ['input-field'],
	classNameBindings: ['inline'],

	computedInputId: computed('inputId', function() {

		const { inputId, elementId } = this.getProperties('inputId', 'elementId');

		if(inputId !== null) return inputId;
		return `${elementId}-input`;
	}),

	inputClasses: computed('hasSuccess', 'hasError', 'triggerValidation', function() {
		
		const classNames = ['validate'];
		const { hasSuccess, hasError } = this.getProperties('hasSuccess', 'hasError');
		
		if(hasError) {
			classNames.push('invalid');
		} else if(hasSuccess) {
			classNames.push('valid');
		}
		
		return classNames.join(' ');
	}),
	
	hasHelpText: computed('helpText', 'hasSuccess', 'hasError', 'triggerValidation', function() {
		const { helpText, hasSuccess, hasError } = this.getProperties('helpText', 'hasSuccess', 'hasError');
		return !isEmpty(helpText) || hasSuccess || hasError;
	}),

	validationTriggerObserver: observer('hasSuccess', 'hasError', 'successMessage', 'errorMessage', function() {
		this.getInputElement().dispatchEvent(new Event('input'));
	}),

	valueObserver: observer('value', function() {
		//Need to update the text field in the next run loop otherwise the value hasn't set yet and the input is updated to quickly.
		//This causes the label of the input to remain over the text in the input.
		next(() => M.updateTextFields());
	}),

	getInputElement() {
		return document.getElementById(this.get('computedInputId'));
	},

	clearValidationState() {
		this.updateValidationState();
	},

	setSuccessValidationState(successMessage) {
		this.updateValidationState(true, successMessage);
	},

	setErrorValidationState(errorMessage) {
		this.updateValidationState(false, null, true, errorMessage);
	},

	updateValidationState(hasSuccess, successMessage, hasError, errorMessage) {

		if(isEmpty(hasSuccess)) hasSuccess = false;
		if(isEmpty(successMessage)) successMessage = null;
		if(isEmpty(hasError)) hasError = false;
		if(isEmpty(errorMessage)) errorMessage = null;

		this.setProperties({ hasSuccess, successMessage, hasError, errorMessage });
	},

	previousValue: null,

	inputValueChange(e) {

		const value = e.target.value;

		//Small hack because we trigger an "input" event to force validation so this method fires twice
		//and causes values to be modified twice in the same render which is a bad practice.
		if(value === this.get('previousValue')) {
			return;
		}

		this.set('previousValue', value);

		if(this.onChange === null || typeof this.onChange !== 'function') return;

		this.onChange(value);
	},

	didInsertElement() {

		M.updateTextFields();

		const inputElement = this.getInputElement();
		inputElement.addEventListener('input', this.inputValueChange.bind(this));
	},

	willDestroyElement() {
		const inputElement = this.getInputElement();
		inputElement.removeEventListener('input', this.inputValueChange.bind(this));
	}
});
