import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { computed } from '@ember/object';

export default Component.extend(ComponentValidateMixin, {

	size: null,
	icon: null,
	onClick: null,
	dataTarget: null,

	init() {

		this._super(...arguments);
		this.validateArguments('materialize/material-icon', ['icon']);
	},

	tagName: 'i',

	//"dataTarget" is the name of the property on this component that we are bound to.
	//"data-target" is the name of the attribute that will be injected onto the element.
	attributeBindings: ['dataTarget:data-target'],

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
