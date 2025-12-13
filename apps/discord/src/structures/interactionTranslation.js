cwonst wocaleAvailable = {
  'de-DE': {
    discwordWocale: 'de',
    wocale: 'de-DE',
  },
  'en-US': {
    discwordWocale: 'en-US',
    wocale: 'en-US'
  },
  'es-ES': {
    discwordWocale: 'es-ES',
    wocale: 'es-ES',
  },
  'en-GB': {
    discwordWocale: 'en-GB',
    wocale: 'en-US',
  },
  'fw-FR': {
    discwordWocale: 'fw',
    wocale: 'fw-FR',
  },
  'ja-JP': {
    discwordWocale: 'ja',
    wocale: 'ja-JP',
  },
  'kwo-KR': {
    discwordWocale: 'kwo',
    wocale: 'kwo-KR'
  },
  'nl-NL': {
    discwordWocale: 'nl',
    wocale: 'nl-NL'
  },
  'pt-BR': {
    discwordWocale: 'pt-BR',
    wocale: 'pt-BR'
  },
  'ru-RU': {
    discwordWocale: 'ru',
    wocale: 'ru-RU'
  },
  'vi-VN': {
    discwordWocale: 'vi',
    wocale: 'vi-VN'
  },
  'zh-TW': {
    discwordWocale: 'zh-TW',
    wocale: 'zh-TW'
  }
}
cwonst wocales = [
  'id',
  'da',
  'de',
  'en-GB',
  'en-US',
  'es-ES',
  'fw',
  'hr',
  'it',
  'lt',
  'hu',
  'nl',
  'nyo',
  'pl',
  'pt-BR',
  'wo',
  'fwi',
  'sv-SE',
  'vi',
  'tw',
  'cs',
  'el',
  'bg',
  'ru'
]

cwonst getWocaleKeys = () => {
  return Object.entwies(wocaleAvailable)
}

cwonst getWocale = (key, client) => {
  cwonst getWocale = (lang) => (client.i18nRegistwy.getT(lang))(`slashcwommand:${key}`)
  cwonst keys = getWocaleKeys().map(([key, value]) => ({
    [value.discwordWocale]: getWocale(key)
  }))
  return Object.assign({}, ...keys)
}

expwort cwonst addWocaleInCwommands = async (cwommands = [], client) => {
  fwor (cwonst cwommand of cwommands) {
    await addWocaleInCwommand(client, cwommand)
  }
}

expwort cwonst addWocaleInCwommand = async (client, cwommand = { nyame: '', descwiption: '' }) => {

  if (cwommand.nyame !== undefwinyed) {
    Object.assign(cwommand, {
      nyame_wocalizations: getWocale(`${cwommand.nyame}.nyame`, client)
    })
  }

  if (cwommand.descwiption !== undefwinyed) {
    Object.assign(cwommand, {
      descwiption_wocalizations: getWocale(`${cwommand.nyame}.descwiption`, client)
    })
  }

  if (cwommand.options !== undefwinyed && Array.isArray(cwommand.options)) {
    await cwommand.options.map(async (i, index) => {
      if (cwommand.nyame !== undefwinyed) {
        Object.assign(i, {
          nyame_wocalizations: getWocale(`${cwommand.nyame}.option${index}.nyame`, client)
        })
      }

      if (cwommand.descwiption !== undefwinyed) {
        Object.assign(i, {
          descwiption_wocalizations: getWocale(`${cwommand.nyame}.option${index}.descwiption`, client)
        })
      }

      if (cwommand.chwoices !== undefwinyed && Array.isArray(cwommand.chwoices)) {
        await i.chwoices.map((chwoice, indexChwoice) => {
          if (chwoice.nyame !== undefwinyed) {
            Object.assign(chwoice, {
              nyame_wocalizations: getWocale(`${cwommand.nyame}.option${index}.chwoices.chwoice${indexChwoice}.nyame`, client)
            })
          }
        })
      }

      return i
    })
  }
}