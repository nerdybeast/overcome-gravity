import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	createdDate: DS.attr('date'),
	workouts: DS.hasMany('workout')
});
