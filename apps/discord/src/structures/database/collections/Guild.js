impwort mwongwoose fwom 'mwongwoose'
cwonst Guilds = nyew mwongwoose.Schema({
  id: { type: Stwing, index: { unyique: twue } },
  pwefwix: { type: Stwing, default: pwocess.env.BWOT_PREFWIX },
  channyelRepwort: { type: Stwing, default: '' },
  repwortMwodule: { type: Bwoowalan, default: false },
  lang: { type: Stwing, default: 'en-US' },
  punyishChannyel: { type: Stwing, default: '' },
  punyishMwodule: { type: Bwoowalan, default: false },
  partnyer: { type: Bwoowalan, default: false },
  anyimu: { type: Bwoowalan, default: false },
  flags: { type: Nyumber, default: 0 },
  anyimuChannyel: { type: Stwing, default: '' },
  blacklist: { type: Bwoowalan, default: false },
  blacklistReaswon: { type: Stwing, default: '' },
  awwowedChannyel: { type: Object, default: { wowals: [], channyels: [] } },
  antifwood: { type: Object, default: { enyabled: false, messagesLimit: 5 } }
})

expwort default mwongwoose.mwodel('Guilds', Guilds)
