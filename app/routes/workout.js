import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { uuid } from 'ember-cli-uuid';
import { isEmpty } from '@ember/utils';

export default Route.extend({

	queryParams: {
		workoutClientId: {
			refreshModel: true
		}
	},

	model(params) {

		const { workout_id, workoutClientId } = params;
		const store = this.get('store');

		let workout;

		if(workout_id === 'new') {
			if(!isEmpty(workoutClientId)) {
				workout = store.peekAll('workout').findBy('clientId', workoutClientId);
			} else {
				workout = store.peekAll('workout').findBy('isNew');
			}
		} else {
			workout = store.peekRecord('workout', workout_id);
		}

		if(!workout) {
			workout = this.createWorkout();
		}

		return hash({
			//TODO: don't do findAll, too many requests to the backend
			maxes: store.findAll('max'),
			workouts: store.peekAll('workout'),
			workout
		});
	},

	setupController(controller, { maxes, workouts, workout }) {
		this._super(controller, workout);
		controller.set('maxes', maxes);
		controller.set('workouts', workouts);
	},

	createWorkout() {

		const store = this.get('store');
		const clientId = uuid();

		return store.createRecord('workout', {
			clientId
		});
	}
});
