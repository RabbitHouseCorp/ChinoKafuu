const BaseDiscord = require('../../discord/Base');
const { Logger } = require('../../discord/src/structures/util');
let BaseRevoltClass = null;
try {
  const { BaseRevolt } = require('../../revolt/build/Base')
  BaseRevoltClass = BaseRevolt
} catch (err) {
  Logger.error('Revolt was not compiled and therefore will not run the framework. Continuing..')
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