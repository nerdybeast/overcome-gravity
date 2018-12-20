import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { uuid } from 'ember-cli-uuid';

export default Route.extend({

	model(params) {

		const { 
			exercise_id,
			workoutClientId
		} = params;

		if(isEmpty(exercise_id)) {
			//TODO: Throw error...
			return;
		}

		const store = this.get('store');

		if(exercise_id === 'new') {

			const workout = store.peekAll('workout').findBy('clientId', workoutClientId);

			if(!workout) {
				//Bail early, we shouldn't be creating an exercise that doesn't have a parent workout to attach to.
				return;
			}

			const exercise = store.createRecord('exercise', {
				clientId: uuid(),
				workout: workout
			});

			workout.get('exercises').addObject(exercise);

			return exercise;
		}

		return store.findRecord('exercise', exercise_id);
	},

	afterModel(exercise) {

		if(!exercise) {
			this.transitionTo('workouts');
		}
	},

	setupController(controller, exercise) {

		this._super(controller, exercise);

		const store = this.get('store');
		controller.set('exercises', store.peekAll('exercise'));
		controller.set('maxes', store.peekAll('max'));
	}
});
