import Component from '@ember/component';
import EmberError from '@ember/error';
import SelectInputOptionModel from 'overcome-gravity/models/objects/select-input-option';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';

export default Component.extend(ComponentValidateMixin, {

	option: null,

	init() {

		this._super(...arguments);

		this.validateArguments('select-input-option', ['option']);

		if(!(this.get('option') instanceof SelectInputOptionModel)) {
			throw new EmberError('Options passed to the "select-input-option" component must be an instance of the "/models/objects/select-input-option" object.');
		}

	},

	tagName: 'option',
	classNameBindings: ['option.classes'],
	attributeBindings: [
		'option.value:value',
		'option.disabled:disabled',
		'option.selected:selected',
		'option.icon:data-icon'
	]

});
