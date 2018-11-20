import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import SelectInputOption from 'overcome-gravity/models/objects/select-input-option';
import { computed, observer } from '@ember/object';
import { uuid } from 'ember-cli-uuid';
import { inject as service } from '@ember/service';

export default Component.extend(ComponentValidateMixin, {

	store: service('store'),
	maxes: null,
	defaultMaxClientId: null,
	onChange: null,

	init() {
		this._super(...arguments);
		this.validateArguments('max-lift-input', ['maxes', 'onChange']);
	},

	maxesOptions: computed('maxes.@each.{id,name}', 'defaultMaxClientId', function() {

		const maxesOptions = this.maxes.sortBy('name').map(max => {

			let selected = max.get('clientId') === this.defaultMaxClientId;

			return SelectInputOption.create({
				value: max.id,
				label: max.name,
				selected
			});
		});

		const readOnlyOption = SelectInputOption.create({
			label: 'Choose a max',
			disabled: true,
			selected: !maxesOptions.isAny('selected')
		});

		const addNewMaxOption = SelectInputOption.create({
			label: '+ Add',
			value: 'add',
			selected: false
		});

		return [readOnlyOption, ...maxesOptions, addNewMaxOption];
	}),

	defaultMaxObserver: observer('defaultMaxClientId', function() {
		if(this.defaultMaxClientId) {
			this.onChange(this.maxes.find(max => max.get('clientId') === this.defaultMaxClientId));
		}
	}),

	actions: {

		maxSelected(maxId) {

			let max;

			if(maxId !== 'add') {
				max = this.maxes.findBy('id', maxId);
			} else {
				max = this.store.createRecord('max', {
					clientId: uuid()
				});
			}

			this.onChange(max);
		}
	}
});
