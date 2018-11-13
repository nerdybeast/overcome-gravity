import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { isBlank } from '@ember/utils';

export default Controller.extend({

	queryParams: [
		'maxClientId',
		'exerciseClientId',
		'workoutClientId',

		//Not guaranteed to be passed but if coming from the exercise route, the exercise name will be passed to this max 
		//controller so we can send it back and have the exercise controller display the correct exercise name.
		'exerciseName'
	],

	maxClientId: null,
	exerciseClientId: null,
	workoutClientId: null,
	exerciseName: null,

	max: alias('model'),

	title: computed('max.id', function() {
		return this.get('max.id') ? this.get('max.name') : 'New Max Lift';
	}),

	actions: {

		save(max) {
			return max.save().then(savedMax => this.set('model', savedMax));
		},
		
		complete() {

			if(!isBlank(this.workoutClientId)) {
				this.transitionToRoute('exercise', 'new', {
					queryParams: {
						workoutClientId: this.workoutClientId,
						maxClientId: this.maxClientId,
						presetExerciseName: this.exerciseName
					}
				});
				return;
			}

			this.transitionToRoute('maxes');
		}
	}

});
