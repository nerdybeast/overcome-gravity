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

		return hash({
			//TODO: don't do findAll, too many requests to the backend
			maxes: store.findAll('max').sortBy('name'),
			workouts: store.peekAll('workout').sortBy('name'),
			workout: workoutPromise
		});
	},

	setupController(controller, { maxes, workouts, workout }) {
		this._super(controller, workout);
		controller.set('maxes', maxes);
		controller.set('workouts', workouts);
		controller.set('workoutClientId', null);
	},

	createWorkout() {

		const store = this.get('store');
		const clientId = uuid();

		return store.createRecord('workout', {
			clientId
		});
	}
});
