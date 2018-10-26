import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { computed } from '@ember/object';

export default Component.extend(ComponentValidateMixin, {

	size: null,
	icon: null,
	onClick: null,

	init() {

		this._super(...arguments);
		this.validateArguments('materialize/material-icon', ['icon']);
	},

	tagName: 'i',
	classNames: ['material-icons'],
	classNameBindings: ['size', 'clickable'],

	clickable: computed('onClick', function() {
		return typeof this.get('onClick') === 'function';
	}),

	//Default ember hook
	click() {
		if(!this.get('clickable')) return;
		this.get('onClick')();
	}
});
