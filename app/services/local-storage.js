import Service from '@ember/service';
import { uuid } from 'ember-cli-uuid';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

export default Service.extend({

	trialUserId: computed(function() {

		const key = 'trialUserId';
		let trialUserId = window.localStorage.getItem(key);

		if(isBlank(trialUserId)) {
			trialUserId = uuid();
			window.localStorage.setItem(key, trialUserId);
		}

		return trialUserId;
	})

});
