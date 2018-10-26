import Component from '@ember/component';
import mixin from 'overcome-gravity/mixins/component-validator-mixin';

export default Component.extend(mixin, {

	title: null,
	bottomMargin: true,

	init() {
		this._super(...arguments);
		this.validateArguments('page-heading', ['title']);
	}
});
