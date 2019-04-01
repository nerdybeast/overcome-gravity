import Controller from '@ember/controller';
import { equal } from '@ember/object/computed';

export default Controller.extend({

	isKG: equal('model.weightType', 'kg'),
	isLBS: equal('model.weightType', 'lbs'),
	isBoth: equal('model.weightType', 'both'),

	actions: {
		weightTypeChange(newWeightType) {
			this.model.set('weightType', newWeightType);
		}
	}
});
