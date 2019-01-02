import Component from '@ember/component';
import { equal } from '@ember/object/computed';
import { observer } from '@ember/object';
import constants from 'overcome-gravity/utils/constants';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';

export default Component.extend(ComponentValidateMixin, {

	weight: null,
	weightType: null,
	onWeightChange: null,

	init() {
		this._super(...arguments);
		this.validateArguments('weight-input', ['onWeightChange']);
	},

	isKG: equal('weightType', 'kg'),

	weightChangeObserver: observer('weight', 'isKG', function() {

		let { weight, isKG } = this.getProperties('weight', 'isKG');

		let kg = 0;
		let lbs = 0;

		if(weight) {
			weight = Number(weight);
			kg = isKG ? weight : Math.round(weight / constants.conversion);
			lbs = !isKG ? weight : Math.round(weight * constants.conversion);
		}

		this.onWeightChange({ kg, lbs });
	}),

	actions: {

		weightTypeChange(weightType) {

			this.set('weightType', weightType);

			//Only calling this to make sure the computed property will be updated.
			this.get('isKG');
		}

	}

});
