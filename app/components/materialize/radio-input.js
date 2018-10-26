import Component from '@ember/component';

export default Component.extend({

	inputName: null,
	onChange: null,

	getRadioButtonElements() {
		const inputName = this.get('inputName');
		return Array.from(document.getElementsByName(inputName));
	},

	onValueChange(e) {

		const onChangeFn = this.get('onChange');

		if(!onChangeFn || typeof onChangeFn !== 'function') {
			return;
		}

		onChangeFn(e.target.value);
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
