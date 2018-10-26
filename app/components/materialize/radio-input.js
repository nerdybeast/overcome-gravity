import Component from '@ember/component';

export default Component.extend({

	inputName: null,
	onChange: null,

	getRadioButtonElements() {
		return Array.from(document.getElementsByName(this.inputName));
	},

	onValueChange(e) {

		if(!this.onChange || typeof this.onChange !== 'function') {
			return;
		}

		this.onChange(e.target.value);
	},

	didInsertElement() {

		this.getRadioButtonElements().forEach(elem => {
			elem.addEventListener('click', this.onValueChange.bind(this));
		});
	},

	willDestroyElement() {

		this.getRadioButtonElements().forEach(elem => {
			elem.removeEventListener('click', this.onValueChange.bind(this));
		});
	}

});
