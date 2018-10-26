import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { uuid } from 'ember-cli-uuid';

export default Service.extend({

	store: service('store'),

	save(modelName, model, relationships) {

		const id = model.get('id') || uuid();
		relationships = relationships || [];

		const attributes = model.toJSON();

		const newModel = this.get('store').push({
			data: {
				id,
				type: modelName,
				attributes
			}
		});

		relationships.forEach(relationship => newModel.set(relationship, model.get(relationship)));

		return newModel;
	}

});
