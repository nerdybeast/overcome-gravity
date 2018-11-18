import DS from 'ember-data';
import { computed } from '@ember/object';
import { sort, mapBy, max, equal } from '@ember/object/computed';

export default DS.Model.extend({

	clientId: DS.attr('string'),
	name: DS.attr('string'),
	order: DS.attr('number'),
	
	//"percent", "rpe", "standard", ect...
	type: DS.attr('string'),
	
	sets: DS.hasMany('set'),
	workout: DS.belongsTo('workout'),
	max: DS.belongsTo('max'),

	setsOrderingAsc: Object.freeze(['order']),
	orderedSets: sort('sets', 'setsOrderingAsc'),

	//Returns an array of all the sets order numbers, ex: [1, 2, 3, ...]
	setsOrderNumbers: mapBy('sets', 'order'),

	//Will return "-Infinity" if the dependent array is empty
	maxSetOrderNumber: max('setsOrderNumbers'),

	nextSetOrderNumber: computed('maxSetOrderNumber', function() {
		return this.maxSetOrderNumber !== -Infinity ? this.maxSetOrderNumber + 1 : 1;
	}),

	isPercentBased: equal('type', 'percent')
});
