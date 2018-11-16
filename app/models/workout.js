import DS from 'ember-data';
import { sort } from '@ember/object/computed';

export default DS.Model.extend({
	clientId: DS.attr('string'),
	name: DS.attr('string'),
	exercises: DS.hasMany('exercise'),

	exercisesOrderingAsc: Object.freeze(['order']),
	orderedExercises: sort('exercises', 'exercisesOrderingAsc')
});
