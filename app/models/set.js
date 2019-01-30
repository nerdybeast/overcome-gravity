import DS from 'ember-data';
import { computed } from '@ember/object';
import { equal, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default DS.Model.extend({

	formula: service('formula'),

	clientId: DS.attr('string'),
	order: DS.attr('number'),
	reps: DS.attr('number'),
	percent: DS.attr('number'),
	repeatCount: DS.attr('string'),
	kg: DS.attr('number'),
	lbs: DS.attr('number'),

	exercise: DS.belongsTo('exercise'),

	max: alias('exercise.max'),
	type: alias('exercise.type'),

	weight: computed('type', 'percent', 'max.{lbs,kg}', 'kg', 'lbs', function() {

		const { type, percent, max, kg, lbs } = this.getProperties('type', 'percent', 'max', 'kg', 'lbs');

		switch(type) {
			case 'percent': {

				let maxLbs = max.get('lbs');
				let maxKg = max.get('kg');
				const maxReps = max.getWithDefault('reps', 1);

				if(maxReps !== 1) {
					maxLbs = this.formula.epley1RepMax(maxLbs, maxReps);
					maxKg = this.formula.epley1RepMax(maxKg, maxReps);
				}

				const calculatedLBS = Math.round(maxLbs * (percent / 100));
				const calculatedKG = Math.round(maxKg * (percent / 100));

				return {
					kg: calculatedKG,
					lbs: calculatedLBS
				};
			}
			default: {
				return { kg, lbs };
			}
		}
	}),

	isPercentBasedSet: equal('type', 'percent')
});
