import Service from '@ember/service';
import M from 'materialize-css';

export default Service.extend({

	_getModalElement(modalId) {
		return document.getElementById(modalId);
	},

	_getModalInstance(modalId) {

		const modalElement = this._getModalElement(modalId);

		if(!modalElement) {
			return;
		}

		return M.Modal.getInstance(modalElement);
	},

	create(modalId, options) {
		M.Modal.init(this._getModalElement(modalId), options);
	},

	destroy(modalId) {
		const instance = this._getModalInstance(modalId);
		if(instance) instance.destroy();
	},

	open(modalId) {
		const instance = this._getModalInstance(modalId);
		if(instance) instance.open();
	},

	close(modalId) {
		const instance = this._getModalInstance(modalId);
		if(instance) instance.close();
	},

});
