const sum = require('../tests/sum');
describe('One plus Two is Three', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
