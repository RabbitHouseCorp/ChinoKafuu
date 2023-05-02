import { checkCommand, loadCommands } from './test-utils'
let commands = []
jest.useFakeTimers()

beforeAll(async () => {
  commands = loadCommands()
})

describe('Test multiple commands.', () => {
  test('Test property.', () => {
    for (const command of commands) {
      expect(checkCommand(command)).toBe(true)
    }
  })

  // test('Test Command', () => {
    
  // })

})



afterAll(() => {
  commands.splice(0, commands.length)
})