const util = require('./test-utils.js')

test('all commands can be properly required and initializated', () => {
  expect(() => util.loadClassesRecursive(`${__dirname}/../apps/discord/src/commands`))
    .not.toThrow()
})
test('all commands follow proper naming rules (CommandName and suffix -Command.js)', () => {
  expect(() => {
    util.getAllFilesRecursive(`${__dirname}/../apps/discord/src/commands`).forEach(c => {
      let hm = c.getAt('/', -1)
      if (!hm.endsWith('Command.js') || !hm.isUpperCase(0)) throw new Error(`${c} doesn't following naming rule! Use CommandName (uppercased) *and* the suffix Command.js`)
      const Command = new (require(c))()
      hm = hm.getAt('.', 0)
      if (hm != Command.constructor.name) throw new Error(`${c}'s class name doesn't match the file name! (file's called ${hm}.js, class's called ${Command.constructor.name})`)
    })
  }).not.toThrow()
})
