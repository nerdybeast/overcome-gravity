import Route from '@ember/routing/route';

export default Route.extend({

	model(params) {

		const store = this.get('store');

		if(params.workout_id === 'new') {
			return store.createRecord('workout');
		}

		return store.peekRecord('workout', params.workout_id);
	}

});
