import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';
import SelectInputOption from 'overcome-gravity/models/objects/select-input-option';
import { computed, observer } from '@ember/object';
import M from 'materialize-css';
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

	//Holds the id of the currently selected max
	// maxId: null,

	// newMax: null,

	// maxIdObserver: observer('maxId', function() {

	// 	if(this.maxId !== 'add') {
	// 		return;
	// 	}

	// 	const newMax = this.store.createRecord('max', {
	// 		clientId: uuid()
	// 	});

	// 	this.set('newMax', newMax);

	// 	this.getModalInstance().open();
	// }),

	maxesOptions: computed('maxes.@each.{id,name}', 'defaultMaxClientId', function() {

		const maxesOptions = this.maxes.sortBy('name').map(max => {

			// let selected = this.newMax && max.get('id') === this.newMax.get('id');
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

	// modalId: computed('elementId', function() {
	// 	return `${this.elementId}-modal`;
	// }),

	// getModalElement() {
	// 	return document.getElementById(this.modalId);
	// },

	// getModalInstance() {
	// 	return M.Modal.getInstance(this.getModalElement());
	// },

	// didInsertElement() {
	// 	M.Modal.init(this.getModalElement());
	// },

	// willDestroyElement() {
	// 	const instance = this.getModalInstance();
	// 	if(instance) instance.destroy();
	// },

	actions: {

		maxSelected(maxId) {

			let max;

			if(maxId !== 'add') {
				max = this.maxes.findBy('id', maxId);
				// this.onChange(this.maxes.findBy('id', maxId));
				// return;
			} else {
				max = this.store.createRecord('max', {
					clientId: uuid()
				});
			}

			this.onChange(max);

			// const newMax = this.store.createRecord('max', {
			// 	clientId: uuid()
			// });
	
			// this.set('newMax', newMax);
	
			// this.getModalInstance().open();
		},

		// addNewMax(max) {
		// 	return max.save().then(savedMax => {
		// 		this.maxes.pushObject(savedMax);
		// 		this.onChange(savedMax);
		// 	});
		// },

		// addNewMaxComplete() {
		// 	this.getModalInstance().close();
		// },

		// addNewMaxCancel() {

		// 	if(this.newMax) {
		// 		this.newMax.rollbackAttributes();
		// 	}

		// 	this.getModalInstance().close();
		// }
	}
});
