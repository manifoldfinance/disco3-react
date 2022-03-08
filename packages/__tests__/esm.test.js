/**
* @filename esm.test.js
* @summary smoketest esm output
*/
import test from 'tape';

// @test ESM
test('runs as ESM', (t) => {
  t.doesNotThrow(async () => {
    await import('../index.js');
  }, 'should not throw');
  t.end();
});
