const BaseDiscord = require('../../discord/Base');
const { Logger } = require('../../discord/src/structures/util');
let BaseRevoltClass = null;
try {
  const { BaseRevolt } = require('../../revolt/build/index')
  BaseRevoltClass = null
} catch (err) {
  throw Logger.error('Revolt package is not compiled. Check the log record.')
}

module.exports = class StartRepository {
  constructor() {
    this.repositories = new Map()

    this.repositories.set('discord', new BaseDiscord(this))
    if (BaseRevoltClass !== null) {
      this.repositories.set('revolt', new BaseRevoltClass(this))
    }
  }
}