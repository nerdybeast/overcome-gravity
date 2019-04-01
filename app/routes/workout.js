import Route from '@ember/routing/route';
import { hash, resolve } from 'rsvp';
import { uuid } from 'ember-cli-uuid';

export default Route.extend({

	model(params) {

		const { workout_id } = params;
		const store = this.get('store');

		let workoutPromise;

		if(workout_id === 'new' || workout_id === 'null') {

			let unsavedWorkout = store.peekAll('workout').findBy('isNew');

			if(!unsavedWorkout) {
				unsavedWorkout = store.createRecord('workout', {
					clientId: uuid()
				});
			}

			workoutPromise = resolve(unsavedWorkout);

		} else {
			workoutPromise = store.findRecord('workout', workout_id);
		}

		const workouts = store.findAll('workout', { reload: true });
		const maxes = store.findAll('max', { reload: true });

		return hash({ maxes, workouts }).then(() => workoutPromise);
	},

	setupController(controller, workout) {

		this._super(controller, workout);

		controller.set('maxes', this.store.peekAll('max').sortBy('name'));
		controller.set('workouts', this.store.peekAll('workout').sortBy('name'));
		controller.set('preferences', this.modelFor('application').preferences);

		if(workout.get('isNew')) {
			controller.set('mode', 'edit');
		}
	}
});
