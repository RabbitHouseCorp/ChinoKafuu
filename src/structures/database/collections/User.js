const mongoose = require('mongoose')

module.exports = mongoose.model(
    'Users',
    new mongoose.Schema({
        _id: { type: String },
        yens: { type: Number, default: 0 },
        timeDaily: { type: String, default: '000000000000' },
        afk: { type: Boolean, default: false },
        afkReason: { type: String, default: null },
        blacklist: { type: Boolean, default: false },
        blacklistReason: { type: String, default: null },
        aboutme: { type: String, default: '\'A Chino é minha amiga!\' Você pode mudar isto usando k.sobremim' },
        profileColor: { type: String, default: '#6b8dff' },
        isMarry: { type: Boolean, default: false },
        marryWith: { type: String, default: '' },
        rep: { type: Number, default: 0 },
        repTime: { type: String, default: '000000000000' },
        shipValue: { type: String, default: null }
    })
)