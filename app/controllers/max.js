import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { isBlank } from '@ember/utils';

export default Controller.extend({

	queryParams: [
		'exerciseClientId',

		//Not guaranteed to be passed but if coming from the exercise route, the exercise name will be passed to this max 
		//controller so we can send it back and have the exercise controller display the correct exercise name.
		'exerciseName'
	],

	exerciseClientId: null,
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

			if(!isBlank(this.exerciseClientId)) {

				const exercise = this.get('store').peekAll('exercise').findBy('clientId', this.exerciseClientId);

				this.transitionToRoute('exercise', exercise, {
					queryParams: {
						maxId: this.max.get('id'),
						presetExerciseName: this.exerciseName
					}
				});

				return;
			}

			this.transitionToRoute('maxes');
		}
	}

});
