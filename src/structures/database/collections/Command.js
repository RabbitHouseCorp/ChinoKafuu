const mongoose = require('mongoose')
const Commands = new mongoose.Schema({
  id: { type: String, index: { unique: true } },
  disable: { type: Boolean, default: false },
  reason: { type: String, default: '' }
})

module.exports = mongoose.model('Commands', Commands)