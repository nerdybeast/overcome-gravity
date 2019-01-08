module.exports = function(env) {

	return {

		clientAllowedKeys: [
			'OVERCOME_GRAVITY_API',
			'AUTH0_DOMAIN',
			'AUTH0_CLIENT_ID',
			'AUTH0_CALLBACK_URL'
		],

		// Fail build when there is missing any of clientAllowedKeys environment variables.
		// By default false.
		//If this value is set to true, the ember build will fail if it can't find a ".env" file in the root of this project
		//which in theory, only exists when running locally. When deployed to a host like Heroku, this file will not exist in the root.
		failOnMissingKey: env === 'local'
	};
};