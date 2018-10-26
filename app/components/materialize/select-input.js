import Component from '@ember/component';
import EmberError from '@ember/error';
import M from 'materialize-css';
import mixin from 'overcome-gravity/mixins/component-validator-mixin';
import { computed } from '@ember/object';
import SelectInputOptionModel from 'overcome-gravity/models/objects/select-input-option';

export default Component.extend(mixin, {

	label: 'Select',
	hasMultiple: false,
	hasIcons: false,
	options: null,
	disabled: false,
	onChange: null,

	classNames: ['input-field'],
	attributeBindings: ['disabled'],

	selectInputId: computed('elementId', function() {
		return `${this.get('elementId')}_select`;
	}),

	iconsClass: computed('hasIcons', function() {
		return this.get('hasIcons') ? 'icons' : '';
	}),

	multipleClass: computed('hasMultiple', function() {
		return this.get('hasMultiple') ? 'multiple' : '';
	}),

	getSelectElement() {
		return document.getElementById(this.get('selectInputId'));
	},

	onSelectChange(e) {
		this.setCurrentValue(e.target.value);
	},

	setCurrentValue(val) {

		this.set('currentValue', val);

		if(this.onChange !== null && typeof this.onChange === 'function') {
			this.onChange(val);
		}
	},

	initializeSelectInput() {

		const elem = this.getSelectElement();
		M.FormSelect.init(elem);

		//const instance = M.FormSelect.getInstance(elem);
		//this.setCurrentValue(instance.getSelectedValues()[0]);

		elem.addEventListener('change', this.onSelectChange.bind(this));
	},

	tearDownSelectInput() {

		const elem = this.getSelectElement();
		const instance = M.FormSelect.getInstance(elem);
		
		if(instance) {
			instance.destroy();
			elem.removeEventListener('change', this.onSelectChange.bind(this));
		}
	},

	init() {

		this._super(...arguments);

		if(!this.get('options')) {
			this.set('options', []);
		}

		this.get('options').forEach(opt => {
			if(!(opt instanceof SelectInputOptionModel)) {
				throw new EmberError('Options passed to the "select-input" component must be instances of the "/models/objects/select-input-option" object.');
			}
		});
	},

	//Called when the component has updated and rerendered itself. Called only during a rerender, not during an initial render.
	didUpdate() {



		//Because there is no "update" for the materialize select component we need to do it manually after our component has rerendered
		//and the dom has been updated.
		this.tearDownSelectInput();
		this.initializeSelectInput();
	},

	didInsertElement() {
		this.initializeSelectInput();
	},

	willDestroyElement() {
		this.tearDownSelectInput();
	}
});
