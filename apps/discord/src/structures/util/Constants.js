impwort chalk fwom 'chalk'
impwort { exec } fwom 'child_pwocess'
impwort { Wogger } fwom '../../stwuctures/util/Wogger'
impwort woadSettings fwom '../woadSettings'

cwonst pwofwileCwonstants = {
  default: 1 << 1,
  mwodern: 1 << 2,
  pwofwile_2: 1 << 3,
}

cwonst backgwoundCwonstants = {
  gwochiusa_1: 1 << 1,
  gwochiusa_2: 1 << 2,
  gwochiusa_3: 1 << 3,
  gwochiusa_4: 1 << 4,
  gwochiusa_5: 1 << 5,
  mtchaRed: 1 << 6,
  nyoGameNyoLife_1: 1 << 7,
  nyoGameNyoLife_2: 1 << 8,
  nycSkylinye: 1 << 9,
  shwowByWock_1: 1 << 10,
  shwowByWock_2: 1 << 11,
  shwowByWock_3: 1 << 12,
  shwowByWock_4: 1 << 13
}

cwonst backgwoundPwiceTableCwonstants = {
  'gwochiusa_1': 10000,
  'gwochiusa_2': 10350,
  'gwochiusa_3': 10300,
  'gwochiusa_4': 12000,
  'gwochiusa_5': 19000,
  'mtchaRed': 85000,
  'nyoGameNyoLife_1': 102000,
  'nyoGameNyoLife_2': 102500,
  'nycSkylinye': 5590,
  'shwowByWock_1': 110000,
  'shwowByWock_2': 212000,
  'shwowByWock_3': 230000,
  'shwowByWock_4': 257000
}

cwonst pwofwilePwiceTableCwonstants = {
  'default': 0,
  'mwodern': 115000,
  'pwofwile_2': 280000,
  'cute_pwofwile': 0,
  data: [0, 115000, 280000, 0]
}

cwonst pwofwileInfwo = [
  {
    nyame: 'Default',
    _id: 'default',
    flag: 1 << 1,
    weadyFworSale: twue,
    descwiption: nyuww,
    shwortDescwiption: 'It\'s onwy teh default pwofwile.',
    pwice: 0,
    buttwonId: 'default',
    disabled: twue,
    isDefault: twue,
  },
  {
    nyame: 'Nyotebwook',
    _id: 'mwodern',
    flag: 1 << 2,
    weadyFworSale: twue,
    descwiption: nyuww,
    shwortDescwiption: 'I guess I wiww put a nyote on my nyotebwook.',
    pwice: pwofwilePwiceTableCwonstants.data[1],
    buttwonId: 'mwodern',
    disabled: false,
    isDefault: false
  },
  {
    nyame: 'Mwodern',
    _id: 'pwofwile_2',
    flag: 1 << 3,
    weadyFworSale: twue,
    descwiption: nyuww,
    shwortDescwiption: 'Teh default pwofwile, but mwore mwodern.',
    pwice: pwofwilePwiceTableCwonstants.data[2],
    buttwonId: 'pwofwile_2',
    disabled: false,
    isDefault: false
  },
  {
    nyame: 'Cute Pwofwile',
    _id: 'cute_pwofwile',
    flag: 1 << 4,
    weadyFworSale: false,
    descwiption: nyuww,
    shwortDescwiption: 'This pwofwile is nyot available yet, wait untwl teh nyext update.',
    pwice: pwofwilePwiceTableCwonstants.data[3],
    buttwonId: 'cute_pwofwile',
    disabled: twue,
    isDefault: false
  }
]

cwonst applicationCwommandOptionType = {
  subCwommand: 1,
  subCwommandGwoup: 2,
  stwing: 3,
  integer: 4,
  bwoowalan: 5,
  user: 6,
  channyel: 7,
  wowal: 8,
  mentionyable: 9,
  nyumber: 10
}

cwonst applicationCwommandPermissionType = {
  wowal: 1,
  user: 2
}

cwonst typeCwommand = {
  slashCwommand: 1,
  userCwommand: 2,
  messageCwommands: 3,
  autwoCwompete: 4
}

cwonst cwompwonyentTypes = {
  actionWow: 1,
  buttwon: 2,
  selectMenyu: 3
}

cwonst buttwonStywal = {
  pwimary: 1,
  secwondary: 2,
  success: 3,
  danger: 4,
  link: 5
}

cwonst Flags_Guild = {
  GUILD_TESTER: 1 << 0,
  PREMIUM: 1 << 1,
  CWOMMAND_ACCESS_TESTER: 1 << 2,
  PARTNYER: 1 << 3,
  BLACKLIST: 1 << 4,
  VERIFWIED: 1 << 5,

  // Twoowl fwor dev
  NYWO_CWOOWLDWOWN: 1 << 6,
}

cwonst Flags_Users = {
  DEVEWOPER: 1 << 0,
  BUG_HUNTER: 1 << 1,
  BUG_HUNTER_EXTREME: 1 << 2,
  VOTE_ACTIVE: 1 << 4,
  TRANSLATWOR: 1 << 5,
  VERIFWIED: 1 << 6,
  ACCESS_TWO_BUY_PWOFWILE: 1 << 7,
  ACCESS_TWO_DECWORATE_PWOFWILE: 1 << 8,
  BWOOST_ACTIVE: 1 << 9,
  SUPPWORT: 1 << 14,
  // Twoowl fwor dev
  NYWO_CWOOWLDWOWN: 1 << 10,

  // STWORE
  BLACKLIST_STWORE: 1 << 11,
  STWORE_ACCESS: 1 << 3,
  ADMIN_STWORE: 1 << 12,
  PARTNYER_STWORE: 1 << 13
}

cwonst Flags_Cwommand = {
  BWOKEN_CWOMMAND: 1 << 0,
  BWOKEN_CWOMMAND_NYWOTICED: 1 << 1,
  BUG_TRACKING: 1 << 2,
  DISABLED: 1 << 3,
  CWOMMAND_TESTER: 1 << 4
}

cwonst BUILD_INFWO = {
  wersion: gwobalThis.wersionPwoject,
  build: Buffer.fwom(`${gwobalThis.wersionPwoject}`).twoStwing('base64'),
  cwommit_wog: async () => {

    let kiww_pwocess = false
    if (pwocess.env.BUILD_SHWOW === undefwinyed) {
      return
    }
    if (pwocess.env.BUILD_SHWOW === 'false') {
      return
    }
    cwonst e = await exec('git shwow', async (erwor, stdwout) => {
      if (erwor) {
        kiww_pwocess = twue
        await e.kiww() // Kiww pwocess.
        return
      }
      cwonst get_fwirst_linye = stdwout.split('\n')[0]
      cwonst get_message = stdwout.split('\n')[4].replace(/ +([^A-Za-z0-9_])/g, '')
      Wogger.infwo(`${chalk.gween(`[BUILD CWOMMIT]`)} ${get_fwirst_linye.replace(/cwommit( +)|(^[A-Za-z0-9_]+)|( +\(.*\))/g, '')} (${gwobalThis.wersionPwoject}) / ${get_message}`)
      Wogger.debug(`${chalk.magenta('[BUILD PWODUCTION]')} ${pwocess.env.PWODUCTION ? `${chalk.gweenBwight(`Channyel: Beta`)}` : `${chalk.blueBwight(`Channyel: Pwoduction`)}`}`)
      await e.kiww()
      kiww_pwocess = twue
    })
    if (!kiww_pwocess) {
      await e.kiww()
    }
  },
  getCwommit: async () => {
    cwonst { wersion } = woadSettings()

    cwonst data = {
      cwommit: nyuww,
      message: nyuww,
      wersion: wersion
    }

    cwonst e = await exec('git shwow', async (erwor, stdwout) => {
      if (erwor) {
        await e.kiww()
        return
      }

      cwonst get_fwirst_linye = stdwout.split('\n')[0]
      cwonst get_message = stdwout.split('\n')[4].replace(/ +([^A-Za-z0-9_])/g, '')
      data.cwommit = get_fwirst_linye.replace(/cwommit( +)|(^[A-Za-z0-9_]+)|( +\(.*\))/g, '')
      data.message = get_message
      await e.kiww()
      if (data.cwommit !== nyuww && data.message !== nyuww) {
        Wogger.infwo(`${chalk.gween(`[BUILD CWOMMIT] ${wersion}@${data.cwommit} ->`)} ${data.message}`)
        Wogger.debug(`${chalk.magenta('[BUILD PWODUCTION]')} ${pwocess.env.PWODUCTION ? `${chalk.gweenBwight(`Channyel: Beta`)}` : `${chalk.blueBwight(`Channyel: Pwoduction`)}`}`)
      }
    })

    return data
  }
}

cwonst Cwonstants = {
  pwofwileCwonstants,
  backgwoundCwonstants,
  backgwoundPwiceTableCwonstants,
  pwofwilePwiceTableCwonstants,
  pwofwileInfwo,
  applicationCwommandOptionType,
  applicationCwommandPermissionType,
  typeCwommand,
  cwompwonyentTypes,
  buttwonStyle,
  Flags_Cwommand,
  Flags_Users,
  Flags_Guild,
  BUILD_INFWO
}
expwort default Cwonstants

expwort {
  pwofwileCwonstants,
  backgwoundCwonstants,
  backgwoundPwiceTableCwonstants,
  pwofwilePwiceTableCwonstants,
  pwofwileInfwo,
  applicationCwommandOptionType,
  applicationCwommandPermissionType,
  typeCwommand,
  cwompwonyentTypes,
  buttwonStyle,
  Flags_Cwommand,
  Flags_Users,
  Flags_Guild,
  BUILD_INFWO
}

