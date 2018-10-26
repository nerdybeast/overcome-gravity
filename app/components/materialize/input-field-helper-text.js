import Component from '@ember/component';

export default Component.extend({

	helpText: null,
	successMessage: null,
	errorMessage: null,

	tagName: 'span',
	classNames: ['helper-text'],
	attributeBindings: ['successMessage:data-success', 'errorMessage:data-error']
});
