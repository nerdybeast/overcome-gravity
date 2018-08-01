import Controller from '@ember/controller';

export default Controller.extend({

	actions: {

		editMax(max) {
			this.transitionToRoute('max', max);
		}

	}

});
