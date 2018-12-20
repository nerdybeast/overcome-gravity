import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';

export default Component.extend(ComponentValidateMixin, {

	modalId: null,
	abortText: 'CANCEL',
	confirmText: 'YES',
	onAbort: null,
	onConfirm: null,

	init() {
		this._super(...arguments);
		this.validateArguments('confirmation-modal', ['modalId', 'onAbort', 'onConfirm']);
	}

});
