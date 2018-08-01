import Route from '@ember/routing/route';

export default Route.extend({

	model() {

		const store = this.get('store');
		const workouts = store.peekAll('workout').filter(wo => !wo.get('isNew'));
		
		if(workouts.length === 0) {

			[{ id: 1, name: 'Sample Workout' }].forEach(wo => {
				
				const { id, name } = wo;
				
				const newWorkout = store.push({
					data: {
						id,
						type: 'workout',
						attributes: {
							name,
							exerciseGroups: [{
								order: 1,
								exercises: [{
									order: 1,
									name: 'Clean',
									sets: 3,
									reps: 3,
									type: 'percentage',
									typeAmount: 70,
									maxId: 4
								}, {
									order: 2,
									name: 'Clean',
									sets: 3,
									reps: 3,
									type: 'percentage',
									typeAmount: 75,
									maxId: 4
								}]
							}]
						}
					}
				});


			});
		}

		return store.peekAll('workout');
	}

});
