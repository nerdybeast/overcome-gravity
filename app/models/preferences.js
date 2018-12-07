import DS from 'ember-data';

export default DS.Model.extend({

	//Expected "kg" or "lbs"
	weightType: DS.attr('string')
});
