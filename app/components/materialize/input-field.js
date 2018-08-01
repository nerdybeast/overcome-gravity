import Component from '@ember/component';
import { computed } from '@ember/object';
import M from 'materialize-css';

export default Component.extend({
	
	type: 'text',
	inputId: null,
	value: null,
	label: null,
	helpText: null,
	hasError: false,
	errorMessage: null,

	init() {
		this._super(...arguments);
	},

	classNames: ['input-field'],

	computedInputId: computed('inputId', function() {

		const { inputId, elementId } = this.getProperties('inputId', 'elementId');

		if(inputId !== null) return inputId;
		return `${elementId}-input`;
	}),

	hasHelpText: computed('helpText', function() {
		return this.get('helpText') !== null;
	}),

	didInsertElement() {
		if(this.get('value') !== null) {
			M.updateTextFields();
		}
	}
});
