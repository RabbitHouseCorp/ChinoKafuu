const BaseDiscord = require('../../discord/Base')
const { BaseRevolt } = require('../../revolt/build/Base')

module.exports = class StartRepository {
  constructor() {
    this.repositories = new Map()

    this.repositories.set('discord', new BaseDiscord(this))
    this.repositories.set('revolt', new BaseRevolt(this))
  }
}