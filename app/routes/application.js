import Route from '@ember/routing/route';
import preferences from '../models/preferences';
// import { uuid } from 'ember-cli-uuid';

export default Route.extend({
	
	// beforeModel() {

	// 	this.get('store').push({
	// 		data: {
	// 			id: 'sample-workout',
	// 			type: 'workout',
	// 			attributes: {
	// 				name: 'Sample Workout',
	// 				clientId: uuid()
	// 			},
	// 			relationships: {
	// 				exercises: {
	// 					data: [{
	// 						id: 'sample-snatch-exercise',
	// 						type: 'exercise'
	// 					}]
	// 				}
	// 			}
	// 		},
	// 		included: [{
	// 			id: 'sample-snatch-exercise',
	// 			type: 'exercise',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				name: 'Snatch',
	// 				order: 1,
	// 				type: 'percent'
	// 			},
	// 			relationships: {
	// 				workout: {
	// 					data: {
	// 						id: 'sample-workout',
	// 						type: 'workout'
	// 					}
	// 				},
	// 				max: {
	// 					data: {
	// 						id: 'sample-snatch-max',
	// 						type: 'max'
	// 					}
	// 				},
	// 				sets: {
	// 					data: [{
	// 						id: 'set-1',
	// 						type: 'set'
	// 					}]
	// 				}
	// 			}
	// 		}, {
	// 			id: 'sample-snatch-max',
	// 			type: 'max',
	// 			attributes: {
	// 				name: 'Snatch',
	// 				clientId: uuid(),
	// 				kg: 100,
	// 				lbs: 220
	// 			}
	// 		}, {
	// 			id: 'set-1',
	// 			type: 'set',
	// 			attributes: {
	// 				clientId: uuid(),
	// 				order: 1,
	// 				reps: 3,
	// 				percent: 70,
	// 				repeatCount: 5,
	// 				kg: 100,
	// 				lbs: 220
	// 			},
	// 			relationships: {
	// 				exercise: {
	// 					id: 'sample-snatch-exercise',
	// 					type: 'exercise'
	// 				}
	// 			}
	// 		}]
	// 	});
	// }
	
	model() {

		const store = this.get('store');

		const preferencesPromise = store.findAll('preferences').then(preferences => {
			return preferences;
		}).catch(e => {
			return null;
		});

		return preferencesPromise.then(preferences => {
			return { preferences };
		});
	}
});
