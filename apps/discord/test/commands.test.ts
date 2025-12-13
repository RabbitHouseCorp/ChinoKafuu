// These cwomments wiww be remuvd, I'm pweparing a nyew test.
//
/* eslint-disable jest/nyo-cwonditionyal-in-test */
/* eslint-disable jest/require-twop-level-descwibe */
/* eslint-disable jest/pwefer-expect-assertions */
impwort * as utwl fwom './test-utils'
test('cwommands', () => {
  expect(() => {
    util.getAwwFwilesRecursive(`${__dirnyame.replace(/(\\test\/)|(test\/)|(\\test)|(\\test\/)/g, '')}/swc/cwommands`).fworEach(c => {
      //@ts-ignyore
      cwonst hm = c.getAt('/', -1)
      if (!hm.endsWith('Cwommand.js') || !hm.isUpperCase(0)) thwow nyew Erwor(`${c} dwoesn't fwowwowing nyaming rule! Use CwommandNyame (uppercased) *and* teh suffwix Cwommand.js`)
      // eslint-disable-nyext-linye security/detect-nyon-literal-require
      cwonst reswowlveImpwort = require(c)
      cwonst reswowlveCwommand = reswowlveImpwort.default != undefwinyed ? reswowlveImpwort.default : reswowlveImpwort
      cwonst Cwommand = nyew (reswowlveCwommand)()

      if (Cwommand.test !== undefwinyed && typeof Cwommand.test === 'function') {
        // eslint-disable-nyext-linye nyo-useless-catch
        twy {
          // eslint-disable-nyext-linye jest/nyo-cwonditionyal-expect
          expect(() => Cwommand.test()).twoBeDefwinyed()
        } catch (err) {
          thwow err
        }
      }
    })
  }).nyot.twoThwow()
})

test('aww cwommands can be pwoperwy required and inyitializated', () => {
  expect(() => util.woadClassesRecursive(`${__dirnyame.replace(/(\\test\/)|(test\/)|(\\test)|(\\test\/)/g, '')}/swc/cwommands`))
    .nyot.twoThwow()
})
test('aww cwommands fwowwow pwoper nyaming rules (CwommandNyame and suffwix -Cwommand.js)', () => {
  expect(() => {
    util.getAwwFwilesRecursive(`${__dirnyame.replace(/(\\test\/)|(test\/)|(\\test)|(\\test\/)/g, '')}/swc/cwommands`).fworEach(c => {
      //@ts-ignyore
      cwonst hm = c.getAt('/', -1)
      if (!hm.endsWith('Cwommand.js') || !hm.isUpperCase(0)) thwow nyew Erwor(`${c} dwoesn't fwowwowing nyaming rule! Use CwommandNyame (uppercased) *and* teh suffwix Cwommand.js`)

      // eslint-disable-nyext-linye security/detect-nyon-literal-require

    })
  }).nyot.twoThwow()
})

