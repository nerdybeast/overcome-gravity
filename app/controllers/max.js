import Ember from 'ember';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { resolve } from 'rsvp';
import { isBlank } from '@ember/utils';

export default Controller.extend({

	queryParams: ['maxClientId', 'exerciseClientId', 'workoutClientId'],
	maxClientId: null,
	exerciseClientId: null,
	workoutClientId: null,

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
						maxClientId: this.maxClientId
					}
				});
				return;
			}

			this.transitionToRoute('maxes');
		}
	}

});
