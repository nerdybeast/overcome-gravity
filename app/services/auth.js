import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import ENV from 'overcome-gravity/config/environment';
import auth0 from 'auth0';
import { uuid } from 'ember-cli-uuid';
import { hash } from 'rsvp';

export default Service.extend({

	storage: service('local-storage'),

	user: null,

	authProvider: computed(function () {
		return new auth0.WebAuth({
			domain: ENV.AUTH0_DOMAIN, // domain from auth0
			clientID: ENV.AUTH0_CLIENT_ID, // clientId from auth0
			redirectUri: ENV.AUTH0_CALLBACK_URL,
			audience: `https://${ENV.AUTH0_DOMAIN}/userinfo`,
			responseType: 'token',
			scope: 'openid profile' // adding profile because we want username, given_name, etc
		});
	}),

	/**
	 * Since this property is set as volatile you need to call "notifyPropertyChange('authResult')"
	 * if the underlying data is changed. That way anything observing this property will be notified of the change.
	 */
	authResult: computed(function() {
		return this.storage.getItem('authResult');
	}).volatile(),

	/**
	 * Since this property is set as volatile you need to call "notifyPropertyChange('isTrialUser')"
	 * if the underlying data is changed. That way anything observing this property will be notified of the change.
	 */
	isTrialUser: computed(function() {
		// const isTrialUser = this.storage.getItem('isTrialUser');
		// return !isBlank(isTrialUser) ? isTrialUser : true;
		return this.storage.getItem('isTrialUser');
	}).volatile(),

	/**
	 * Since this property is set as volatile you need to call "notifyPropertyChange('lastUser')"
	 * if the underlying data is changed. That way anything observing this property will be notified of the change.
	 */
	lastUser: computed(function() {
		return this.storage.getItem('lastUser');
	}).volatile(),

	isFirstTimeUser: computed('authResult', 'isTrialUser', function() {
		const { authResult, isTrialUser } = this.getProperties('authResult', 'isTrialUser');
		return isBlank(authResult) && isBlank(isTrialUser);
	}),

	isGuestUser: or('isFirstTimeUser', 'isTrialUser'),

	createGuestAccount() {

		const id = uuid();
		this.storage.setItem('trialUserId', uuid());

		this.storage.setItem('isTrialUser', true);
		this.notifyPropertyChange('isTrialUser');

		this.set('user', {
			id,
			name: 'Guest'
		});
	},

	/**
	 * Send a user over to the hosted auth0 login page
	 */
	login(username) {
		return this.authProvider.authorize({
			login_hint: username
		});
	},

	/**
	 * Computed to tell if a user is logged in or not
	 * TODO: Check sessionStorage (or local storage for this instead of hitting the api every time)
	 * @return boolean
	 */
	isAuthenticated: computed('authResult', function() {
		return !isBlank(this.authResult) && new Date().getTime() < this.authResult.expiresAt;
	}),

	/**
	 * When a user lands back on our application
	 * Parse the hash and store user info
	 */
	handleAuthentication() {
		return this._parseHash()
			.then(authResult => {

				this.storage.setItem('isTrialUser', false);
				this.notifyPropertyChange('isTrialUser');

				this._handleAuthResult(authResult);
				return this._userInfo(authResult.accessToken);
			})
			// .then(slimProfile => this._getUser(slimProfile.sub))
			// .then(fullProfile => this.set('user', fullProfile));
			.then(slimProfile => this.set('user', slimProfile));
	},

	/**
	 * Check if we are authenticated using the auth0 library's checkSession
	 */
	checkLogin() {
		return this._checkSession()
			.then(authResult => {

				this._handleAuthResult(authResult);
				return this._userInfo(authResult.accessToken);
			})
			.catch(e => {

				if(e.error === 'login_required') {
					//Return a blank profile
					return {};
				}

				return Promise.reject(e);
			})
			// .then(slimProfile => this._getUser(slimProfile.sub))
			// .then(fullProfile => this.set('user', fullProfile));
			.then(slimProfile => this.set('user', slimProfile));
	}, 

	/**
	 * Get rid of everything in sessionStorage that identifies this user
	 */
	logout() {

		this.storage.removeItem('authResult');
		this.notifyPropertyChange('authResult');

		this.authProvider.logout({
			clientID: ENV.AUTH0_CLIENT_ID,
			//returnTo: 'http://localhost:4200'
		});
	},
	
	_parseHash() {
		return new Promise((resolve, reject) => {
			this.authProvider.parseHash((err, authResult) => {

				if (err) {
					console.warn('error calling parseHash()', err);
					return reject(err);
				}

				console.info('authResult', authResult);
				return resolve(authResult);
			});
		});
	},

	/**
	 * Check to see if the user is currently authenticated.
	 */
	_checkSession(options) {

		options = options || {};

		return new Promise((resolve, reject) => {
			this.authProvider.checkSession(options, (err, authResult) => {

				if (err) {
					console.warn('error calling checkSession()', err);
					return reject(err);
				}

				console.info('authResult', authResult);
				return resolve(authResult);
			});
		});
	},

	/**
	 * Returns a slim profile with minimal information
	 * @param {string} accessToken 
	 */
	_userInfo(accessToken) {
		return new Promise((resolve, reject) => {
			// once we have a token, we are able to go get the users information
			this.authProvider.client.userInfo(accessToken, (err, profile) => {

				if(err) {
					console.warn('error calling userInfo()', err);
					return reject(err);
				}

				if(!profile.id && profile.sub) {
					profile.id = profile.sub;
				}

				this.storage.setItem('lastUser', profile);
				this.notifyPropertyChange('lastUser');

				console.info('profile', profile);
				return resolve(profile);
				//setTimeout(() => resolve(profile), 10000);
			});
		});
	},

	// _getUser(userId) {

	// 	return this._checkSession({
	// 		audience: `https://${ENV.AUTH0_DOMAIN}/api/v2/`,
	// 		scope: 'read:current_user'
	// 	}).then(authResult => {

	// 		const managementProvider = new auth0.Management({
	// 			domain: ENV.AUTH0_DOMAIN,
	// 			token: authResult.accessToken
	// 		});

	// 		return new Promise((resolve, reject) => {

	// 			managementProvider.getUser(userId, (err, profile) => {

	// 				if(err) {
	// 					console.warn('Error calling getUser() =>', err);
	// 					return reject(err);
	// 				}

	// 				console.info('profile from calling getUser() =>', profile);
	// 				return resolve(profile);
	// 			});

	// 		})

	// 	});
	// },

	_handleAuthResult(authResult) {
		authResult.expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
		this.storage.setItem('authResult', authResult);
		this.notifyPropertyChange('authResult');
	}
});