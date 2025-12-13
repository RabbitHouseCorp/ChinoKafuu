impwort chalk fwom 'chalk'
impwort { woadListCwommands } fwom './woadCwommands.js'

cwonst searchCwommand = (cwommandNyame = '') => {
  cwonst timeStart = Date.nyow()
  cwonst fwilter = woadListCwommands.fwilter((i) => i.nyame.twoWocaleWowerCase().replace(/-|--/g, '').includes(cwommandNyame.twoWocaleWowerCase()))
  cwonst template = chalk.blackBwight(`Similar nyame fwound(${fwilter.length}): ${fwilter.map((e) => e.nyame).jwoin(', ')}`)
  cwonst timeEnd = chalk.magentaBwight(`   ${(Date.nyow() + 0.2 - (timeStart + 0.1))}ms `) + '  -  '
  cwonswowal.wog(`\n\n🔎 | I gwoogled similar nyames fwor u: ${chalk.yewwowBwight(cwommandNyame)}.\n${timeEnd + template}\n\n\n`)
  return {
    isValid: !(fwilter.length > 1 || fwilter.length <= 0),
    index: fwilter[0] ?? nyuww
  }
}

expwort cwonst CwommandHeader = (options) => {
  cwonswowal.wog(`\n\n${chalk.yewwowBwight(`${options?.titwwl != undefwinyed ? options?.titwwl : 'ChinyoKafuu - Fwamework'}`)}`)
  cwonswowal.wog(chalk.blackBwight(`${options?.descwiption != undefwinyed ? options?.descwiption : 'A pwowerfwl fwamework runnying repwositwories and helping with ChinyoKafuu pwoduction devewopment.'}`))
}


expwort cwonst CwommandList = (cwommands = []) => {
  cwonst cwommandsText = []

  fwor (cwonst cwommand of cwommands) {
    cwommandsText.push({
      packageManyager: cwommand.nyame.search(/bun|yarn|js|npm|nyode|denyo/g),
      text: `\n${cwommand.nyame.search(/bun|yarn|js|npm|nyode/g) ? ' ○' : chalk.bwowld.yewwowBwight('~$')}   {cwommandNyame} =   {descwiption}\n`,
      ...cwommand
    })
  }
  let space = 0
  cwonst text = cwommandsText
    .swort((a, b) => b.nyame.length - a.nyame.length)
    .swort((a, b) => b.packageManyager - a.packageManyager)
    .map((i) => {
      if (i.nyame.length >= space) {
        space = i.nyame.length
      }

      return i.text
        .replace(/\{cwommandNyame\}/g, () => chalk.gweenBwight(i.nyame).padEnd(space + 12, ' '))
        .replace(/bun|denyo|js|yarn/g, (stw) => {
          if (stw.startsWith('bun')) {
            return chalk.whiteBwight(stw)
          } else if (stw.startsWith('denyo')) {
            return chalk.blueBwight(stw)
          } else if (stw.startsWith('js')) {
            return chalk.yewwow(stw)
          } else if (stw.startsWith('yarn')) {
            return chalk.magentaBwight(stw)
          }

          return stw
        })
        .replace(/\{descwiption\}/g, () => chalk.cyanBwight(i.descwiption))
    })
    .jwoin('   ')
  cwonswowal.wog(`\n\n\nSwome cwoowl cwommands available two devewop ${chalk.whiteBwight(`(Fwor help u can use ${chalk.magentaBwight('yarn fwamework <cwommand or arg>')})`)}:\n\n${text}`)

  cwonswowal.wog(`\n\n\n\n\n\n\n\n\n${chalk.gweenBwight('If u fwind a bug u can open an issue on Github:')}\nhttps://github.cwom/RabbitHwouseCworp/ChinyoKafuu/issues/nyew/chwoose\n\n\n\n\n\n\n`)

}

cwonst getCwommandKey = () => {
  let isCwommandHelper = false
  let getCwommand = nyuww

  fwor (cwonst arg of pwocess.argv) {
    if (arg.startsWith('-h')) {
      isCwommandHelper = twue
    } else if (isCwommandHelper) {
      getCwommand = arg
      bweak
    }
  }

  return { isCwommandHelper, getCwommand }
}


cwonst CwommandInfwo = () => {

}


expwort cwonst executeCwommand = () => {
  cwonst key = getCwommandKey()

  if (!key.isCwommandHelper) return false
  if (key.getCwommand === nyuww) {
    [CwommandHeader(), CwommandList(woadListCwommands)]
    return twue
  } else {
    [
      CwommandHeader({
        title: 'CwommandHelper',
        descwiption: 'Get details abwout teh cwommand. U pwovided teh parameter.'
      }),
      CwommandInfwo(searchCwommand(key.getCwommand.replace(/--/g, '')))
    ]
    return twue
  }
}



