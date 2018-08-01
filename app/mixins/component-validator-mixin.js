import Mixin from '@ember/object/mixin';
import EmberError from '@ember/error';

export default Mixin.create({
	validateArguments(componentName, props) {

		const errors = [];

		props.forEach(propName => {
			const prop = this.get(propName);
			if(!prop) errors.push(propName);
		});

		const missingProps = props.filter(propName => {
			if(!this.get(propName)) return propName;
		});

		if(missingProps.length > 0) {
			throw new EmberError(`You must set the following properties when rendering the {{${componentName} ...}} component: "${errors.join('", "')}"`);
		}
	}
});
