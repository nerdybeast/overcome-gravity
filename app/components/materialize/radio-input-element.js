import Component from '@ember/component';

export default Component.extend({
	tagName: 'input',
	type: 'radio',
	checked: null,
	name: null,
	value: null,
	attributeBindings: ['type', 'checked', 'name', 'value']
});
