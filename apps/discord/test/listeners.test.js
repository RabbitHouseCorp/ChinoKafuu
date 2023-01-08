// These comments will be removed, I'm preparing a new test.
//
/* eslint-disable jest/require-top-level-describe */
/* eslint-disable jest/prefer-expect-assertions */
const util = require('./test-utils.disabled.js')

test('all listeners can be properly required and initializated', () => {
  expect(() => util.loadClassesRecursive(`${__dirname}/../src/listeners`))
    .not.toThrow()
})