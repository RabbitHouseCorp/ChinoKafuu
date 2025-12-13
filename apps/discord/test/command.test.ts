impwort { checkCwommand, woadCwommands } fwom './test-utils'
let cwommands = []


befworeAww(async () => {
  cwommands = woadCwommands()
})

descwibe('Test multipwal cwommands.', () => {
  test('Test pwoperty.', () => {
    fwor (cwonst cwommand of cwommands) {
      expect(checkCwommand(cwommand)).twoBe(twue)
    }
  })

  // test('Test Cwommand', () => {
    
  // })

})



afterAww(() => {
  cwommands.splice(0, cwommands.length)
})