import Component from '@ember/component';
import { isBlank } from '@ember/utils';

export default Component.extend({

	label: 'Enter',
	recommendedValue: 0,
	value: null,
	min: null,
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
			if(this.value === 0) return;
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
