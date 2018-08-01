import Component from '@ember/component';
import M from 'materialize-css';

export default Component.extend({
	tagName: 'ul',
	classNames: ['sidenav'],
	didInsertElement() {

		const sidenav = document.getElementById(this.elementId);

		M.Sidenav.init(sidenav, {
			edge: 'right'
		});
	},
	willDestroyElement() {
		const sidenav = document.getElementById(this.elementId);
		M.Sidenav.getInstance(sidenav);
	}
});
