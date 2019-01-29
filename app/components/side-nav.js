import Component from '@ember/component';
import { inject as service } from '@ember/service';
import M from 'materialize-css';

export default Component.extend({

	tagName: 'ul',
	classNames: ['sidenav'],

	auth: service('auth'),

	didInsertElement() {

		const sidenav = document.getElementById(this.elementId);

		M.Sidenav.init(sidenav, {
			edge: 'right'
		});
	},

	willDestroyElement() {
		const sidenav = document.getElementById(this.elementId);
		M.Sidenav.getInstance(sidenav);
	},

	actions: {

		logout() {
			this.auth.logout();
		}

	}
});
