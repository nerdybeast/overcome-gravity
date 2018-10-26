import Component from '@ember/component';
import ComponentValidateMixin from 'overcome-gravity/mixins/component-validator-mixin';

export default Component.extend(ComponentValidateMixin, {

	workout: null,

	init() {
		this._super(...arguments);
		this.validateArguments('workout-overview', ['workout']);
	},

	
});
