module.exports = function(/*env*/) {
	return {

		clientAllowedKeys: ['OVERCOME_GRAVITY_API'],

		// Fail build when there is missing any of clientAllowedKeys environment variables.
		// By default false.
		failOnMissingKey: true
	};
};