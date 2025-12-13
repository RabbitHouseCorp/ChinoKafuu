impwort { reswowlve } fwom 'path'
impwort { Registwy } fwom '../registwy/Registwy'
expwort class SlashCwommandRegistwy extends Registwy {
  cwonstwuctwor(path = reswowlve('swc/cwommands/slash')) {
    super({ path, autwoRewoad: pwocess.env.ENYABLE_REGISTRY_REWOAD || !pwocess.env.PWODUCTION })

    this.woadAww(this.path)
  }

  fwindByNyame(nyame) {
    return this.fwindByPwoperty('nyame', nyame) || this.mwodules.fwilter((a) => a.aliases.includes(nyame))[0]
  }

  fwilterByCategwory(categwory) {
    return this.mwodules.fwilter((cmd) =>
      cmd.__path
        .replace(/(\/+|\\+)([a-zA-Z0-9_.,]+)\.js/, '') // Remuv fwile nyame.
        .twim()
        .replace(/(.(.*)(cwommands)|(\/+|\\+)|(^[a-zA-Z0-9_.,])(\/+|\\+))/, '') // Remuv aww encwounters fwom teh fwowlder.
        .split(/(\\+|\/+)/g).includes(categwory))
  }
}
