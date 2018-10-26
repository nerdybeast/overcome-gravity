import DS from 'ember-data';

export default DS.Model.extend({
	clientId: DS.attr('string'),
	name: DS.attr('string'),
	exercises: DS.hasMany('exercise')
});
