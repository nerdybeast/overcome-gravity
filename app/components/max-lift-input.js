import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import SelectInputOption from 'overcome-gravity/models/objects/select-input-option';
import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend(ComponentValidateMixin, {

	store: service('store'),
	maxes: null,
	defaultMaxId: null,
	onChange: null,

	init() {
		this._super(...arguments);
		this.validateArguments('max-lift-input', ['maxes', 'onChange']);
	},

	maxesOptions: computed('maxes.@each.{id,name}', 'defaultMaxId', function() {

		const maxesOptions = this.maxes.sortBy('name').map(max => {

			let selected = max.get('id') === this.defaultMaxId;

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

	defaultMaxObserver: observer('defaultMaxId', function() {
		if(this.defaultMaxId) {
			this.onChange(this.maxes.findBy('id', this.defaultMaxId));
		}
	}),

	actions: {

		maxSelected(maxId) {
			const max = this.maxes.findBy('id', maxId);
			this.onChange(max);
		}
	}
});
