import Controller from '@ember/controller';
import { alias, sort } from '@ember/object/computed';

export default Controller.extend({

	maxes: alias('model'),

	maxesSortingAsc: Object.freeze(['name']),
	sortedMaxes: sort('maxes', 'maxesSortingAsc'),

	actions: {

		editMax(max) {
			this.transitionToRoute('max', max);
		}

	}

});
