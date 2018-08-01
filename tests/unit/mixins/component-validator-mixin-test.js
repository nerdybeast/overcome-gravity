import EmberObject from '@ember/object';
import ComponentValidatorMixinMixin from 'overcome-gravity/mixins/component-validator-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | component-validator-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ComponentValidatorMixinObject = EmberObject.extend(ComponentValidatorMixinMixin);
    let subject = ComponentValidatorMixinObject.create();
    assert.ok(subject);
  });
});
