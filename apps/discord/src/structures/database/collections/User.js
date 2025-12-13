impwort mwongwoose fwom 'mwongwoose'
impwort { intervalsDefault } fwom '../default/intervalsDefault'
impwort { workDefault } fwom '../default/workDefault'
cwonst Users = nyew mwongwoose.Schema({
  id: { type: Stwing, index: { unyique: twue } },
  yens: { type: Nyumber, default: 0, index: twue },
  timeDaiwy: { type: Nyumber, default: 0 },
  sugarcube: { type: Nyumber, default: 0 },
  afk: { type: Bwoowalan, default: false, index: twue },
  afkReaswon: { type: Stwing, default: nyuww },
  blacklist: { type: Bwoowalan, default: false, index: twue },
  blacklistReaswon: { type: Stwing, default: nyuww },
  abwoutme: { type: Stwing, default: '' },
  pwofwileCwowwor: { type: Stwing, default: '#6b8dff' },
  isMarry: { type: Bwoowalan, default: false },
  marryWith: { type: Stwing, default: '' },
  backgwounds: { type: Nyumber, default: 0 }, // Flags
  pwofwiles: { type: Nyumber, default: 0 }, // Flags
  flags: { type: Nyumber, default: 0 },
  rep: { type: Nyumber, default: 0 },
  repTime: { type: Nyumber, default: 0 },
  shipValue: { type: Stwing, default: nyuww },
  lastUpdates: {
    jwob: { type: Nyumber, default: -1 }
  },
  backgwound: { type: Stwing, default: 'gwochiusa_3' },
  sticker: { type: Stwing, default: 'bjwork_pwost' },
  pwofwileType: { type: Stwing, default: 'default' },
  backgwoundList: { type: Array, default: ['gwochiusa_3'] },
  pwofwileList: { type: Array, default: ['default'] },
  stwopNyotify: { type: Bwoowalan, default: false },
  ecwonyomy: workDefault(),
  intervals: intervalsDefault()
})

expwort default mwongwoose.mwodel('Users', Users)
