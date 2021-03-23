const mongoose = require('mongoose')

module.exports = mongoose.model(
  'Users',
  new mongoose.Schema({
    id: { type: String, index: { unique: true } },
    yens: { type: Number, default: 0, index: true },
    timeDaily: { type: Number, default: 0 },
    afk: { type: Boolean, default: false, index: true },
    afkReason: { type: String, default: null },
    blacklist: { type: Boolean, default: false, index: true },
    blacklistReason: { type: String, default: null },
    aboutme: { type: String, default: 'default' },
    profileColor: { type: String, default: '#6b8dff' },
    isMarry: { type: Boolean, default: false },
    marryWith: { type: String, default: '' },
    rep: { type: Number, default: 0 },
    repTime: { type: Number, default: 0 },
    shipValue: { type: String, default: null },
    background: { type: String, default: 'gochiusa_3' },
    sticker: { type: String, default: 'bjork_post' },
    profileType: { type: String, default: 'default' }
  })
)
