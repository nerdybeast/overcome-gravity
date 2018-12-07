import Component from '@ember/component';
import M from 'materialize-css';
import { computed } from '@ember/object';
import { bool } from '@ember/object/computed';

export default Component.extend({

	onEdit: null,
	onDelete: null,

	hasEditFunction: bool('onEdit'),
	hasDeleteFunction: bool('onDelete'),

	customIconId: computed('elementId', function() {
		return `${this.get('elementId')}-icon`;
	}),

	customMenuId: computed('elementId', function() {
		return `${this.get('elementId')}-menu`;
	}),

	iconElement() {
		return document.getElementById(this.customIconId);
	},

	iconInstance() {
		var element = this.iconElement();
		var instance = M.Dropdown.getInstance(element);
		return instance;
	},

	didInsertElement() {

		var element = this.iconElement();

		M.Dropdown.init(element, {
			coverTrigger: false
		});
	},

	willDestroyElement() {

		var instance = this.iconInstance();

		if(instance) {
			instance.destroy();
		}
	},

	actions: {

		openMenu() {
			var instance = this.iconInstance();
			instance.open();
		}

	}

});
