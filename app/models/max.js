import DS from 'ember-data';
import { gt } from '@ember/object/computed';

export default DS.Model.extend({
	name: DS.attr('string'),
	clientId: DS.attr('string'),
	kg: DS.attr('number'),
	lbs: DS.attr('number'),
	reps: DS.attr('number'),
	isMultiRepMax: gt('reps', 1)
});
