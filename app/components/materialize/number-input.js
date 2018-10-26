import Component from '@ember/component';
import { isBlank } from '@ember/utils';

export default Component.extend({

	label: 'Enter',
	value: 0,
	min: null,
	max: null,
	step: 1,
	onChange: null,

	init() {

		this._super(...arguments);

		if(isBlank(this.get('value'))) {
			this.set('value', 0);
		}
	},

	actions: {

		increaseCount() {
			this.incrementProperty('value');
			this.notifyOfChange();
		},

		decreaseCount() {
			if(this.get('value') === 0) return;
			this.decrementProperty('value');
			this.notifyOfChange();
		}
	},

	notifyOfChange() {
		if(typeof this.onChange === 'function') {
			this.onChange(this.get('value'));
		}
	}

});
