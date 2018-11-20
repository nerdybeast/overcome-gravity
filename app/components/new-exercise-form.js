import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import M from 'materialize-css';

export default Component.extend(ComponentValidateMixin, {

	exerciseName: null,
	recommendedExerciseName: null,
	selectedMaxClientId: null,
	exerciseType: 'percent',
	maxes: null,
	exercises: null,
	onSave: null,
	onCancel: null,
	onNewMax: null,

	init() {

		this._super(...arguments);

		if(!isBlank(this.selectedMaxClientId)) {
			this.set('selectedMax', this.maxes.findBy('clientId', this.selectedMaxClientId));
		}
	},

	selectedMax: null,

	isPercentBasedExercise: equal('exerciseType', 'percent'),

	defaultExerciseName: computed('recommendedExerciseName', 'selectedMax', 'isPercentBasedExercise', function() {
		return this.selectedMax !== null && this.isPercentBasedExercise ? this.selectedMax.get('name') : this.recommendedExerciseName;
	}),

	onAutocomplete(exerciseName) {
		
		if(!this.isPercentBasedExercise || this.selectedMax) {
			return;
		}

		const exercises = this.exercises.filterBy('name', exerciseName);

		let exerciseToUse = exercises.find(exercise => exercise.get('max.clientId'));

		if(!exerciseToUse) {
			exerciseToUse = exercises.get('firstObject');
		}

		const maxCientId = exerciseToUse.get('max.clientId');

		if(maxCientId) {
			this.set('selectedMaxClientId', maxCientId);
		}
	},

	didInsertElement() {

		//Note: This reduce function will eliminate duplicates
		const exerciseNamesObject = this.exercises
			.map(exercise => exercise.get('name'))
			.sort()
			.reduce((prev, curr) => {
				if(curr) {
					prev[curr] = null;
				}
				return prev;
			}, {})

		const exerciseNameInputElement = document.getElementById('exercise-name-input');

		M.Autocomplete.init(exerciseNameInputElement, {
			data: exerciseNamesObject,
			onAutocomplete: this.onAutocomplete.bind(this)
		});
	},

	willDestroyElement() {
		var instance = M.Autocomplete.getInstance(document.getElementById('exercise-name-input'));
		if(instance) instance.destroy();
	},

	actions: {

		maxLiftChange(max) {

			if(max.get('isNew')) {
				this.onNewMax(max);
				return;
			}

			this.set('selectedMax', max);
		},

		saveNewExercise() {

			if(this.isPercentBasedExercise && isBlank(this.selectedMax)) {
				M.toast({html: 'Please select a max'});
				return;
			}

			if(isBlank(this.exerciseName)) {
				this.set('exerciseName', this.defaultExerciseName);
			}

			this.onSave(this.exerciseName, this.exerciseType, this.selectedMax);
		},

		cancel() {
			this.onCancel();
		}

	}

});
