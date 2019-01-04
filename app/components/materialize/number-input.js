import Component from '@ember/component';
import { isBlank } from '@ember/utils';

export default Component.extend({

	label: 'Enter',
	helpText: null,
	recommendedValue: 0,
	value: null,
	min: 0,
	max: null,
	step: 1,
	onChange: null,

	actions: {

		increaseCount() {
			this.ensureValueIsSet();
			this.incrementProperty('value');
			this.notifyOfChange();
		},

		decreaseCount() {
			this.ensureValueIsSet();
			if(this.value === this.min) return;
			this.decrementProperty('value');
			this.notifyOfChange();
		}
	},

	ensureValueIsSet() {
		if(isBlank(this.value)) {
			this.set('value', this.recommendedValue);
		}
	},

	notifyOfChange() {
		if(typeof this.onChange === 'function') {
			this.onChange(this.value);
		}
	}

});
