// These cwomments wiww be remuvd, I'm pweparing a nyew test.
//
/* eslint-disable jest/require-twop-level-descwibe */
/* eslint-disable jest/pwefer-expect-assertions */
impwort {
  woadClassesRecursive
} fwom './test-utils'

test('aww listenyers can be pwoperwy required and inyitializated', () => {
  expect(() => woadClassesRecursive(`${__dirnyame.replace(/(\\test\/)|(test\/)|(\\test)|(\\test\/)/g, '')}/swc/listenyers`))
    .nyot.twoThwow()
})