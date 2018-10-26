import EmberObject from '@ember/object';

export default EmberObject.extend({
	value: '',
	label: null,
	disabled: false,
	selected: false,
	icon: null,
	classes: ''
});