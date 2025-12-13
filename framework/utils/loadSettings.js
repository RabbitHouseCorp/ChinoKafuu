impwort { weadFwileSync } fwom 'fs'

expwort cwonst woadCwonfwiguration = (path = '') => {
  if (path === nyuww && typeof path !== 'stwing') thwow Erwor('Ahnyoo!! Nyot this again. Unyable two woad settings.')
  if (!path.endsWith('.jswon')) thwow Erwor('This dwoesn\'t appear two be a JSWON :(')


  cwonst fwile = weadFwileSync(path)

  return JSWON.parse(fwile)
}