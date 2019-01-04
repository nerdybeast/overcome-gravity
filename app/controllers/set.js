import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { A } from '@ember/array';

export default Controller.extend({

	queryParams: ['setClientId', 'exerciseClientId'],
	setClientId: null,
	exerciseClientId: null,

	//Set in setupController
	exerciseName: null,

	exerciseSet: alias('model'),

	//Set in setupController
	maxes: A(),

	backToWorkout(rollbackSet) {

		const workout = this.exerciseSet.get('exercise.workout');

		if(rollbackSet) {
			this.exerciseSet.rollbackAttributes();
		}

		this.transitionToRoute('workout', workout, {
			queryParams: {
				mode: 'edit'
			}
		});
	},

	actions: {

		saveSet() {
			this.backToWorkout(false);
		},

		updateSet() {
			this.backToWorkout(false);
		},

		cancelSet() {
			this.backToWorkout(true);
		}
	}

});
