import DS from 'ember-data';
import { equal } from '@ember/object/computed';

export default DS.Model.extend({

	//Expected "kg", "lbs", or "both"
	weightType: DS.attr('string'),

	isKG: equal('weightType', 'kg'),
	isLBS: equal('weightType', 'lbs'),
	isBoth: equal('weightType', 'both'),
});
