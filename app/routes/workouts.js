import Route from '@ember/routing/route';

export default Route.extend({

	model() {

		const store = this.get('store');

		return store.findAll('workout', {
			//Forces the model to wait to resolve until it receives a response from the server.
			reload: true
		});
	}

});
