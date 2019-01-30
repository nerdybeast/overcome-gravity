import Service from '@ember/service';

//One rep max formulas => https://en.wikipedia.org/wiki/One-repetition_maximum

export default Service.extend({

	brzycki1RepMax(weight, reps) {
		return weight / (1.0278 - (.0278 * reps));
	},

	epley1RepMax(weight, reps) {
		return weight * (1 + (reps / 30));
	}
});
