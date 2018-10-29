import DS from 'ember-data';
import ENV from 'overcome-gravity/config/environment';

export default DS.JSONAPIAdapter.extend({
	host: ENV.OVERCOME_GRAVITY_API
});
