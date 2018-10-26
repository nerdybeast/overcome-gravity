import DS from 'ember-data';
import { filterBy } from '@ember/object/computed';

export default DS.Model.extend({

	clientId: DS.attr('string'),
	name: DS.attr('string'),
	order: DS.attr('number'),
	
	//"percent", "rpe", "standard", ect...
	type: DS.attr('string'),
	
	sets: DS.hasMany('set'),
	workout: DS.belongsTo('workout'),
	max: DS.belongsTo('max'),

	savedSets: filterBy('sets', 'isNew', false)
});
