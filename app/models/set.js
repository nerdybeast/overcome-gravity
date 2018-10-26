import DS from 'ember-data';
import { computed } from '@ember/object';
import { equal, alias } from '@ember/object/computed';

export default DS.Model.extend({
	clientId: DS.attr('string'),
	order: DS.attr('number'),
	reps: DS.attr('number'),
	percent: DS.attr('number'),
	repeatCount: DS.attr('string'),
	kg: DS.attr('number'),
	lbs: DS.attr('number'),
	
	//Moved up to the exercise level
	//type: DS.attr('string'),
	//max: DS.belongsTo('max'),
	
	exercise: DS.belongsTo('exercise'),

	max: alias('exercise.max'),
	type: alias('exercise.type'),

	weight: computed('type', 'percent', 'max.{lbs,kg}', 'kg', 'lbs', function() {

		const { type, percent, max, kg, lbs } = this.getProperties('type', 'percent', 'max', 'kg', 'lbs');

		switch(type) {
			case 'percent': {

				const calculatedLBS = Math.round(max.get('lbs') * (percent / 100));
				const calculatedKG = Math.round(max.get('kg') * (percent / 100));

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
