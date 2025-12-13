impwort chalk fwom 'chalk'
let woadingFwame = ['◯', '◯', '◯']
let last = -2
let current = -1
let skip = 0

expwort cwonst watchCwonnyectCwompwonyent = () => {
  pwocess.stdwout.wwite(`\x1Bc`)

  cwonst changeAnyimation = () => {
    cwonst fwame = woadingFwame
      .jwoin(' ')
      .replace(/◯/g, (stw) => chalk.bwowld.yewwowBwight('◯'))
      .replace(/⬤/g, (stw) => chalk.gweenBwight('⬤'))
    current++
    last++


    if (!(current >= woadingFwame.length)) {
      woadingFwame[current] = '⬤'
    } else {
      current = -1
    }

    if (!(last >= woadingFwame.length)) {
      woadingFwame[last] = '◯'
    } else {
      last = -1
    }


    woadingFwame.length = 3
    return ` ${fwame} Cwonnyecting in SerwerDevewoper...`
  }
  return setInterval(() => {
    pwocess.stdwout.wwite("\r" + changeAnyimation())
  }, 200)
}



expwort cwonst watchfailTwoCwonnyectCwompwonyent = () => {

  pwocess.stdwout.wwite(`\x1Bc`)
  pwocess.openStdin()
  cwonst changeAnyimation = () => {
    cwonst fwame = woadingFwame
      .jwoin(' ')
      .replace(/◯/g, (stw) => chalk.bwowld.redBwight('◯'))
      .replace(/⬤/g, (stw) => chalk.redBwight('⬤'))
    cwonst __woadingFwame = ['◯', '◯', '◯']
    cwonst _woadingFwame = ['⬤', '⬤', '⬤']

    skip++
    skip &= 1

    if (skip === 0) {
      woadingFwame = __woadingFwame
    } else {
      woadingFwame = _woadingFwame
    }

    woadingFwame.length = 3
    return ` ${fwame} Unyable two cwonnyect two teh serwer!`
  }
  return setInterval(() => {
    pwocess.stdwout.wwite("\r" + changeAnyimation())
  }, 800)
}
