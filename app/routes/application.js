import Route from '@ember/routing/route';
import { uuid } from 'ember-cli-uuid';

export default Route.extend({
	// beforeModel() {

	// 	const store = this.get('store');

	// 	const sampleSnatchMax = store.push({
	// 		data: {
	// 			id: 'sample-snatch-max',
	// 			type: 'max',
	// 			attributes: {
	// 				name: 'Snatch',
	// 				clientId: uuid(),
	// 				kg: 100,
	// 				lbs: 220
	// 			}
	// 		}
	// 	});

	// 	const sampleCJMax = store.push({
	// 		data: {
	// 			id: 'sample-cj-max',
	// 			type: 'max',
	// 			attributes: {
	// 				name: 'Clean & Jerk',
	// 				clientId: uuid(),
	// 				kg: 125,
	// 				lbs: 276
	// 			}
	// 		}
	// 	});

	// 	const sampleFrontSquatMax = store.push({
	// 		data: {
	// 			id: 'sample-front-squat-max',
	// 			type: 'max',
	// 			attributes: {
	// 				name: 'Front Squat',
	// 				clientId: uuid(),
	// 				kg: 140,
	// 				lbs: 309
	// 			}
	// 		}
	// 	});

	// 	const sampleWorkout = store.push({
	// 		data: {
	// 			id: 'sample-workout',
	// 			type: 'workout',
	// 			attributes: {
	// 				name: 'Sample Workout',
	// 				clientId: uuid()
	// 			}
	// 		}
	// 	});

	// 	const sampleHyperExercise = store.push({
	// 		data: {
	// 			id: 'sample-hyper-exercise',
	// 			type: 'exercise',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				name: 'Hyperextension',
	// 				order: 1,
	// 				type: 'standard'
	// 			}
	// 		}
	// 	});

	// 	const sampleSnatchExercise = store.push({
	// 		data: {
	// 			id: 'sample-snatch-exercise',
	// 			type: 'exercise',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				name: 'Snatch',
	// 				order: 2,
	// 				type: 'percent'
	// 			}
	// 		}
	// 	});

	// 	sampleSnatchExercise.set('max', sampleSnatchMax);

	// 	const sampleCJExercise = store.push({
	// 		data: {
	// 			id: 'sample-cj-exercise',
	// 			type: 'exercise',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				name: 'Clean & Jerk',
	// 				order: 3,
	// 				type: 'percent'
	// 			}
	// 		}
	// 	});

	// 	sampleCJExercise.set('max', sampleCJMax);

	// 	const sampleFrontSquatExercise = store.push({
	// 		data: {
	// 			id: 'sample-front-squat-exercise',
	// 			type: 'exercise',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				name: 'Front Squats',
	// 				order: 4,
	// 				type: 'percent'
	// 			}
	// 		}
	// 	});

	// 	sampleFrontSquatExercise.set('max', sampleFrontSquatMax);

	// 	const sampleHyperSets = store.push({
	// 		data: [{
	// 			id: 'sample-hyper-set-1',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 1,
	// 				reps: 6,
	// 				//type: 'standard',
	// 				percent: null,
	// 				repeatCount: 2,
	// 				kg: 20,
	// 				lbs: 44
	// 			}
	// 		}]
	// 	});

	// 	const sampleSnatchSets = store.push({
	// 		data: [{
	// 			id: 'sample-snatch-set-1',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 1,
	// 				reps: 3,
	// 				//type: 'percent',
	// 				percent: 50,
	// 				repeatCount: 2,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}, {
	// 			id: 'sample-snatch-set-2',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 2,
	// 				reps: 3,
	// 				//type: 'percent',
	// 				percent: 60,
	// 				repeatCount: 1,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}, {
	// 			id: 'sample-snatch-set-3',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 3,
	// 				reps: 3,
	// 				//type: 'percent',
	// 				percent: 70,
	// 				repeatCount: 3,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}, {
	// 			id: 'sample-snatch-set-4',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 4,
	// 				reps: 2,
	// 				//type: 'percent',
	// 				percent: 80,
	// 				repeatCount: 2,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}]
	// 	});

	// 	const sampleCJSets = store.push({
	// 		data: [{
	// 			id: 'sample-cj-set-1',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 1,
	// 				reps: 2,
	// 				// type: 'percent',
	// 				percent: 60,
	// 				repeatCount: 2,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}, {
	// 			id: 'sample-cj-set-2',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 2,
	// 				reps: 2,
	// 				// type: 'percent',
	// 				percent: 70,
	// 				repeatCount: 2,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}, {
	// 			id: 'sample-cj-set-3',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 3,
	// 				reps: 1,
	// 				// type: 'percent',
	// 				percent: 75,
	// 				repeatCount: 1,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}, {
	// 			id: 'sample-cj-set-4',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 4,
	// 				reps: 1,
	// 				// type: 'percent',
	// 				percent: 80,
	// 				repeatCount: 2,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}]
	// 	});

	// 	const sampleFrontSquatSets = store.push({
	// 		data: [{
	// 			id: 'sample-front-squat-set-1',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 1,
	// 				reps: 2,
	// 				// type: 'percent',
	// 				percent: 50,
	// 				repeatCount: 2,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}, {
	// 			id: 'sample-front-squat-set-2',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 2,
	// 				reps: 1,
	// 				// type: 'percent',
	// 				percent: 60,
	// 				repeatCount: 1,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}, {
	// 			id: 'sample-front-squat-set-3',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 3,
	// 				reps: 2,
	// 				// type: 'percent',
	// 				percent: 70,
	// 				repeatCount: 2,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}, {
	// 			id: 'sample-front-squat-set-4',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 4,
	// 				reps: 1,
	// 				// type: 'percent',
	// 				percent: 85,
	// 				repeatCount: 2,
	// 				kg: null,
	// 				lbs: null
	// 			}
	// 		}]
	// 	});

	// 	sampleWorkout.set('exercises', [
	// 		sampleHyperExercise,
	// 		sampleSnatchExercise,
	// 		sampleCJExercise,
	// 		sampleFrontSquatExercise
	// 	]);

	// 	sampleHyperExercise.set('workout', sampleWorkout);
	// 	sampleSnatchExercise.set('workout', sampleWorkout);
	// 	sampleCJExercise.set('workout', sampleWorkout);
	// 	sampleFrontSquatExercise.set('workout', sampleWorkout);

	// 	sampleHyperSets.forEach(x => x.setProperties({
	// 		exercise: sampleHyperExercise
	// 	}));

	// 	sampleSnatchSets.forEach(x => x.setProperties({
	// 		// max: sampleSnatchMax,
	// 		exercise: sampleSnatchExercise
	// 	}));

	// 	sampleCJSets.forEach(x => x.setProperties({
	// 		// max: sampleCJMax,
	// 		exercise: sampleCJExercise
	// 	}));

	// 	sampleFrontSquatSets.forEach(x => x.setProperties({
	// 		// max: sampleFrontSquatMax,
	// 		exercise: sampleFrontSquatExercise
	// 	}));

	// }
});
