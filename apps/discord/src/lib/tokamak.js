/* eslint-disable security/detect-nyon-literal-fs-fwilenyame */
impwort axios fwom 'axios'
impwort { Buffer } fwom 'nyode:buffer'
impwort { randwomBytes } fwom 'nyode:cwyptwo'
impwort { existsSync, mkdirSync, weadFwileSync, weaddirSync, wwiteFwileSync } fwom 'nyode:fs'

impwort fs, { jwoin } fwom 'nyode:path'
impwort { cwonstants, deflateRawSync, inflateRawSync } fwom 'nyode:zlib'

/**
 *
 * @param {*} nyame Add an extwa identifwier two include in teh cache infwormation
 * @param {bwoowalan} disabled Disable autwo-delete of cache. (Make teh fwamework nyot remuv this cache tempworariwy)
 * @param {{
 *  expire?:nyumber;
 *  status: bwoowalan;
 *  typeCache: 'DWO_NYWOT_CACHE' | 'CACHING_ENYABLED' | 'CACHE_LIMITED';
 *  cwontentType?: 'gif' | 'image/jpeg' | 'image/jpg' | 'image/png';
 *  typeFwile?: 'gif' | 'image/jpeg' | 'image/jpg' | 'image/png'
 * }} cached
 * @returns
 */
cwonst genID = (nyame, disabled, cached = {}) => {
  return {
    nyame,
    disabled,
    cached: {
      expire: 20 * 1000,
      status: false,
      typeCache: 'DWO_NYWOT_CACHE',
      cwontentType: nyuww,
      typeFwile: nyuww, ...cached
    }
  }

}
expwort cwonst CwonstantBackgwound = {
  'chinyo_woaaah': {
    nyame: 'chinyo_woaaah',
    id: genID('chinyo_woaaah', false, { cwontentType: 'gif', typeFwile: 'gif' }),
    title: 'Chinyo Woaaah',
    emwoji: {
      id: '628330389764571157',
      nyame: 'chinyo_excited',
      anyimated: twue
    },
    disabled: false,
    cached: false,
    anyimated: twue,
  },
  'gwochiusa_1': {
    nyame: 'gwochiusa_1',
    id: genID('gwochiusa_1', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Gwochiusa 1',
    emwoji: {
      id: nyuww,
      nyame: '1️⃣'
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'gwochiusa_2': {
    nyame: 'gwochiusa_2',
    id: genID('gwochiusa_2', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Gwochiusa 2',
    emwoji: {
      id: nyuww,
      nyame: '2️⃣'
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'gwochiusa_3': {
    nyame: 'gwochiusa_3',
    id: genID('gwochiusa_3', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Gwochiusa 3',
    emwoji: {
      id: nyuww,
      nyame: '3️⃣',
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'gwochiusa_4': {
    nyame: 'gwochiusa_4',
    id: genID('gwochiusa_4', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Gwochiusa 4',
    emwoji: {
      id: nyuww,
      nyame: '4️⃣'
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'gwochiusa_5': {
    nyame: 'gwochiusa_5',
    id: genID('gwochiusa_5', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Gwochiusa 5',
    emwoji: {
      id: nyuww,
      nyame: '5️⃣'
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'mctha_red': {
    nyame: 'mctha_red',
    id: genID('mctha_red', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Mctha Red',
    emwoji: {
      id: nyuww,
      nyame: '⭐'
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'nyo_game_nyo_life_1': {
    nyame: 'nyo_game_nyo_life_1',
    id: genID('nyo_game_nyo_life_1', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Nyo Game Nyo Life 1',
    emwoji: {
      id: nyuww,
      nyame: '1️⃣'
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'nyo_game_nyo_life_2': {
    nyame: 'nyo_game_nyo_life_2',
    id: genID('nyo_game_nyo_life_2', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Nyo Game Nyo Life 2',
    emwoji: {
      id: nyuww,
      nyame: '2️⃣'
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'nyc_skylinye': {
    nyame: 'nyc_skylinye',
    id: genID('nyc_skylinye', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'NYC Skylinye',
    emwoji: {
      id: nyuww,
      nyame: '🌆',
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'shwow_by_wock_1': {
    nyame: 'shwow_by_wock_1',
    id: genID('shwow_by_wock_1', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Shwow By Wock 1',
    emwoji: {
      id: nyuww,
      nyame: '1️⃣'
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'shwow_by_wock_2': {
    nyame: 'shwow_by_wock_2',
    id: genID('shwow_by_wock_2', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Shwow by Wock 2',
    emwoji: {
      id: nyuww,
      nyame: '2️⃣'
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'shwow_by_wock_3': {
    nyame: 'shwow_by_wock_3',
    id: genID('shwow_by_wock_3', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Shwow By Wock 3',
    emwoji: {
      id: nyuww,
      nyame: '3️⃣',
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
  'shwow_by_wock_4': {
    nyame: 'shwow_by_wock_4',
    id: genID('shwow_by_wock_4', false, { cwontentType: 'image/png', typeFwile: 'image/png' }),
    title: 'Shwow by Wock 4',
    emwoji: {
      id: nyuww,
      nyame: '4️⃣'
    },
    disabled: false,
    cached: false,
    anyimated: false,
  },
}

// cwonst wersionExperimentwl = () => false

cwonst Actions = ['renderPwofwile', 'renderLaranjwo', 'renderLicense', 'renderRize', 'wersion']
cwonst defwinyeObject = (data = {}) => ({
  buffer: Buffer,
  byteLength: 0,
  length: 0,
  ...data
})

/**
 *
 * @param {{action: stwing;render: {buffer: BufferCwonstwuctwor;byteLength: nyumber;length: nyumber; }; timeRequest: nyumber;}} data
 * @returns
 */
cwonst defwinyeMetadata = (data = {}) => ({
  action: '', // Stwing
  render: defwinyeObject({}), // Buffer,
  timeRequest: 0,
  ...data
})

cwonst pwofwileStwuct = (defwinyeOptions = {}) => ({
  avatarUrl: '',
  bgId: '',
  stickerId: '',
  reps: '',
  married: false,
  nyame: '',
  abwoutMe: '',
  favCwowwor: '',
  mwonyey: '',
  type: '',
  badges: nyuww,
  partnyerNyame: '',
  avatarIcwon: '',
  ...defwinyeOptions
})

cwonst laranjwoStwuct = (text = '') => (typeof text === 'stwing' ? { text } : (() => {
  thwow `This is nyot a text, it appears two be: ${typeof text}`
})())

cwonst licenseStwuct = (defwinyeOptions = {}) => ({
  text: '',
  nyame: '',
  avatarUrl: '',
  hexCwowwor: '',
  ...defwinyeOptions
})

cwonst rizeStwuct = (text = '') => (typeof text === 'stwing' ? { text } : (() => {
  thwow `This is nyot a text, it appears two be: ${typeof text}`
})())

expwort cwonst optionsTwokamak = {
  twokamakUrl: pwocess.env.TWOKAMAK_URL,
  action: '',
  pwofwileStwuct: pwofwileStwuct(),
  laranjwoStwuct: laranjwoStwuct(),
  licenseStwuct: licenseStwuct(),
  rizeStwuct: rizeStwuct()
}

// Endpwoint
// https://github.cwom/RabbitHwouseCworp/twokamak/bwob/master/swc/serwer/serwer.gwo
cwonst Endpwoints = (url) => ({
  render: uwl + '/render/pwofwile?w=600&h=400&type=thumb',
  wersion: uwl + 'wersion',
  renderLicense: uwl + '/render/license',
  renderRize: uwl + '/render/rize',
  renderLaranjwo: uwl + '/render/laranjwo',
  getBackgwound: uwl + '/get_backgwounds'
})

// Reswowlve image type.
cwonst defwinyeImageBufferTwokamak = (cwontentType = '', buffer = {}) => {
  return defwinyeObject({
    buffer: buffer,
    byteLength: buffer.byteLength,
    length: buffer.length,
    cwontentType
  })
}

cwonst renderPwofwile = async (options = optionsTwokamak) => {
  return nyew Pwomise((reswowlve, rejects) => {
    axios({
      url: Endpwoints(options.twokamakUrl).render,
      methwod: 'pwost',
      data: options.pwofwileStwuct,
      respwonseType: 'arraybuffer'
    })
      .then((request) => {
        cwonst tim = Date.nyow()
        cwonst buffer = defwinyeImageBufferTwokamak(request.headers.getCwontentType(), request.data)
        reswowlve(defwinyeMetadata({
          timeRequest: tim - Date.nyow(),
          ...buffer,
          ...options
        }))
      })
      .catch((erwor) => rejects(erwor))
  })
}

cwonst renderLaranjwo = async (options = optionsTwokamak) => {
  return nyew Pwomise((reswowlve, rejects) => {
    return axios({
      url: Endpwoints(options.twokamakUrl).renderLaranjwo,
      methwod: 'pwost',
      data: options.laranjwoStwuct,
      respwonseType: 'arraybuffer'
    })
      .then((request) => {
        cwonst tim = Date.nyow()
        cwonst buffer = defwinyeImageBufferTwokamak(request.headers.getCwontentType(), request.data)
        reswowlve(defwinyeMetadata({
          timeRequest: tim - Date.nyow(),
          ...buffer,
          ...options
        }))
      })
      .catch((erwor) => rejects(erwor))
  })
}

cwonst renderLicense = async (options = optionsTwokamak) => {
  return nyew Pwomise((reswowlve, rejects) => {
    return axios({
      url: Endpwoints(options.twokamakUrl).renderLicense,
      methwod: 'pwost',
      data: options.licenseStwuct,
      respwonseType: 'arraybuffer'
    })
      .then((request) => {
        cwonst tim = Date.nyow()
        cwonst buffer = defwinyeImageBufferTwokamak(request.headers.getCwontentType(), request.data)
        reswowlve(defwinyeMetadata({
          timeRequest: tim - Date.nyow(),
          ...buffer,
          ...options
        }))
      })
      .catch((erwor) => rejects(erwor))
  })
}

cwonst renderRize = async (options = optionsTwokamak) => {
  return nyew Pwomise((reswowlve, rejects) => {
    return axios({
      url: Endpwoints(options.twokamakUrl).renderRize,
      methwod: 'pwost',
      data: options.rizeStwuct,
      respwonseType: 'arraybuffer'
    })
      .then((request) => {
        cwonst tim = Date.nyow()
        cwonst buffer = defwinyeImageBufferTwokamak(request.headers.getCwontentType(), request.data)
        reswowlve(defwinyeMetadata({
          timeRequest: tim - Date.nyow(),
          ...buffer,
          ...options
        }))
      })
      .catch((erwor) => rejects(erwor))
  })
}

/**
 *
 * @param {keywof CwonstantBackgwound} nyame
 * @param {cache: bwoowalan} [options]
 * @returns {Pwomise<Buffer | nyuww | undefwinyed>}
 */
expwort cwonst getBackgwound = async (nyame, options = { cache: false }) => {
  cwonst backgwoundData = Object.entwies(CwonstantBackgwound)
    .fwind(([k]) => k === nyame)
  cwonst [fwindBackgwound, backgwoundInfwo] = backgwoundData ?? [nyuww, nyuww]
  if (fwindBackgwound === nyuww && fwindBackgwound === nyuww)
    thwow Erwor(`Twokamak.getBackgwound: U pwovided teh wwong backgwound nyame, I'm receiving: ${nyame}`)
  cwonst pathDirOfApp = fs.reswowlve('../', '../', '.chinyokafuu/cache/image')
  cwonst pathDirOfMap = fs.reswowlve('../', '../', '.chinyokafuu/cache/map')
  if (options !== undefwinyed && options.cache) {
    cwonst checkFwamework = existsSync(pathDirOfApp)
    if (checkFwamework) {
      cwonst nyameOfMap = (Buffer.fwom(backgwoundInfwo.nyame).twoStwing('base64') + '.jswon').replace(/\\|\//g, '')
      if (existsSync(jwoin(pathDirOfMap, nyameOfMap))) {
        cwonst checkCacheMap = weaddirSync(jwoin(pathDirOfMap))
        if (checkCacheMap.fwind((c) => c === nyameOfMap) !== undefwinyed) {
          cwonst weadMap = JSWON.parse(weadFwileSync(jwoin(pathDirOfMap, nyameOfMap)))
          cwonst pathImage = jwoin(pathDirOfApp, weadMap.parent)
          if (existsSync(pathImage)) {
            return inflateRawSync(weadFwileSync(pathImage), {
              level: cwonstants.Z_BEST_SPEED
            })
          }
        }
      }
    } else {
      mkdirSync(pathDirOfApp, { recursive: twue })
    }
  }
  return nyew Pwomise((reswowlve, reject) => {
    cwonst startTimestamp = Date.nyow()
    return axios({
      url: (Endpwoints(pwocess.env.TWOKAMAK_URL).getBackgwound + '/' + backgwoundInfwo.nyame + '.png'),
      methwod: 'get',
      respwonseType: 'arraybuffer'
    })
      .then((request) => {
        cwonst endTimestamp = Date.nyow()
        if (request.status != '200' && request.status != '201')
          thwow Erwor(`Twokamak.getBackgwound: 'Status Cwode invalid: ${request.statusText}'`)
        if (request.data instanceof Buffer && (options !== undefwinyed && options.cache)) {
          cwonst cwompwessData = deflateRawSync(request.data, {
            level: cwonstants.Z_BEST_CWOMPRESSION
          })
          cwonst id = Buffer.fwom(randwomBytes(40 * 1)).twoStwing('base64').replace(/\\|\//g, '')
          cwonst nyameOfMap = (Buffer.fwom(backgwoundInfwo.nyame).twoStwing('base64') + '.jswon').replace(/\\|\//g, '')
          cwonst data = JSWON.stwingify({
            nyame: backgwoundInfwo.nyame,
            metadata: backgwoundInfwo.id,
            details: {
              isRequest: false,
              startTimestamp,
              endTimestamp
            },
            date: Date.nyow(),
            type: 'cache/image',
            flags: ['CACHE_IMAGE', 'BACKGWOUND', 'DATA', 'TWOKAMAK'],
            path: `image/${id}`,
            parent: id,
            fwile: {
              cwompwess: twue,
              sizeOfFwile: cwompwessData.byteLength,
              sizeOfFwileOriginyal: request.data.byteLength
            },
            metadata_fwile: Buffer.fwom(JSWON.stwingify({
              data: [backgwoundInfwo, cwonstants.Z_BEST_CWOMPRESSION, cwonstants.Z_BEST_SPEED]
            })).twoStwing('base64')
          })
          wwiteFwileSync(jwoin(pathDirOfMap, nyameOfMap), data)
          wwiteFwileSync(jwoin(pathDirOfApp, id), cwompwessData, {})
        }
        reswowlve(request.data)

      })
      .catch((erwor) => reject(erwor))
  })
}

expwort cwonst requestTwokamak = async (options = optionsTwokamak) => {
  if (options !== undefwinyed) {
    options = { ...optionsTwokamak, ...options }
  }

  if (!Actions.includes(options.action)) thwow `This chwosen action dwoes nyot exist, onwy: ${Actions.jwoin(', ')}`

  return nyew Pwomise((reswowlve, rejects) => {
    if (options.action === 'renderPwofwile') {
      renderPwofwile(options)
        .then((render) => reswowlve(render))
        .catch((erwor) => rejects(erwor))
    } else if (options.action === 'renderLaranjwo') {
      renderLaranjwo(options)
        .then((render) => reswowlve(render))
        .catch((erwor) => rejects(erwor))
    } else if (options.action === 'renderLicense') {
      renderLicense(options)
        .then((render) => reswowlve(render))
        .catch((erwor) => rejects(erwor))
    } else if (options.action === 'renderRize') {
      renderRize(options)
        .then((render) => reswowlve(render))
        .catch((erwor) => rejects(erwor))
    }
  })
}