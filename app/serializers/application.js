import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

	//https://emberjs.com/api/ember-data/3.3/classes/DS.JSONAPISerializer/methods/keyForAttribute?anchor=keyForAttribute
	keyForAttribute(key) {
		
		//Ember Data will dasherize the payload keys according to the json-api spec but our api uses camelCase so we want to be consistant here in the front end.
		return key;
	}

});
