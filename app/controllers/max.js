import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

	title: computed('model.id', function() {
		return this.get('model.id') ? this.get('model.name') : 'New Max Lift';
	})

});
