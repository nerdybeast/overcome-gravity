import Route from '@ember/routing/route';

export default Route.extend({

	model() {

		const store = this.get('store');
		const savedMaxes = store.peekAll('max').filter(max => !max.get('isNew'));

		if(savedMaxes.length === 0) {

			[
				{ id: 1, name: 'Snatch', kg: 71, lbs: 165 },
				{ id: 2, name: 'Hang Snatch', kg: 65, lbs: 155 },
				{ id: 3, name: 'Clean & Jerk', kg: 100, lbs: 225 },
				{ id: 4, name: 'Hang Clean', kg: 95, lbs: 210 }
			].forEach(max => {

				const { id, name, kg, lbs } = max;

				store.push({
					data: {
						id,
						type: 'max',
						attributes: {
							name,
							kg,
							lbs
						}
					}
				});

			});
		}

		return store.peekAll('max');
	}

});
