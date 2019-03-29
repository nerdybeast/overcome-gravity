import DS from 'ember-data';

export default DS.Model.extend({

	//Expected "kg", "lbs", or "both"
	weightType: DS.attr('string')
});
