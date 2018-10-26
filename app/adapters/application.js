import DS from 'ember-data';
import ENV from 'overcome-gravity/config/environment';

export default DS.JSONAPIAdapter.extend({
	host: ENV.OG_API_DOMAIN
});
