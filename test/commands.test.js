const util = require('./test-utils.js')

test('all commands can be properly required and initializated', () => {
  expect(() => util.loadClassesRecursive(`${__dirname}/../src/commands`))
  .not.toThrow()
})
