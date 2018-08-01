import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | maxes', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:maxes');
    assert.ok(route);
  });
});
