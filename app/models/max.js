import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	kg: DS.attr('number'),
	lbs: DS.attr('number')
});
