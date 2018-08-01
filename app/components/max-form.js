import Component from '@ember/component';
import { inject as service } from "@ember/service";
import M from 'materialize-css';
import constants from 'overcome-gravity/utils/constants';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';

export default Component.extend(ComponentValidateMixin, {

	max: null,

	init() {
		this._super(...arguments);
		this.validateArguments('max-form', ['max']);
	},

	store: service('store'),

	weight: null,

	didInsertElement() {

		//If this component was rendered with a max already set, we need to update the Materialize input fields
		//to push the placeholder above the input so they don't run on top of the input value.
		if(!this.get('max.isNew')) {
			M.updateTextFields();
		}
	},

	willDestroyElement() {
		
		const max = this.get('max');

		if(max.get('isNew')) {
			this.get('store').unloadRecord(max);
		}
	},

	actions: {

		maxFormSubmit() {
		
			const enteredWeight = Number(this.weight || 0);
		
			const elems = Array.from(document.getElementsByName('weight-type'));
			const weightType = (elems.findBy('checked', true) || { value: undefined }).value;
			const isKG = weightType === 'kg';
		
			const kgWeight = isKG ? enteredWeight : Math.round(enteredWeight / constants.conversion);
			const lbsWeight = !isKG ? enteredWeight : Math.round(enteredWeight * constants.conversion);
		
			this.get('max').setProperties({
				kg: kgWeight,
				lbs: lbsWeight
			});
		
			//console.info(this.max);
		}
	
	}
});
