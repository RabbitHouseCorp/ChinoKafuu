const util = require('./test-utils.js')

test('all listeners can be properly required and initializated', () => {
  expect(() => util.loadClassesRecursive(`${__dirname}/../discord/src/listeners`))
    .not.toThrow()
})
