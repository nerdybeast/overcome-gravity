import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { uuid } from 'ember-cli-uuid';
import { isEmpty } from '@ember/utils';
import { resolve } from 'rsvp';

export default Route.extend({

	queryParams: {
		workoutClientId: {
			refreshModel: true
		}
	},

	model(params) {

		const { workout_id, workoutClientId } = params;
		const store = this.get('store');

		let workoutPromise;

		if(workout_id === 'new') {

			let unsavedWorkout;

			if(!isEmpty(workoutClientId)) {
				unsavedWorkout = store.peekAll('workout').findBy('clientId', workoutClientId);
			} else {
				unsavedWorkout = store.peekAll('workout').findBy('isNew');
			}

			if(!unsavedWorkout) {
				unsavedWorkout = this.createWorkout();
			}

			workoutPromise = resolve(unsavedWorkout);

		} else {
			workoutPromise = store.findRecord('workout', workout_id);
		}

		let workouts = store.peekAll('workout');
		let maxes = store.peekAll('max');

		if(workouts.length === 0) {
			workouts = store.findAll('workout', { reload: true });
		}

		if(maxes.length === 0) {
			maxes = store.findAll('max', { reload: true });
		}

		return hash({
			maxes,
			workouts,
			workout: workoutPromise
		});
	},

	setupController(controller, { maxes, workouts, workout }) {
		this._super(controller, workout);
		controller.set('maxes', maxes.sortBy('name'));
		controller.set('workouts', workouts.sortBy('name'));
		controller.set('workoutClientId', null);

		if(workout.get('isNew')) {
			controller.set('mode', 'edit');
		}
	},

	createWorkout() {

		const store = this.get('store');
		const clientId = uuid();

		return store.createRecord('workout', {
			clientId
		});
	}
});
