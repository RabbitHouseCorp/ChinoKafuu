/* eslint-disable no-unused-vars */
const { PlatformPackage } = require('../Platform');

module.exports = class Discord extends PlatformPackage.Platform {
  constructor(state) {
    super('discord', {
      'isTypescript': false
    });
    this.state = state
  }

  // Starting the Discord Application!
  runner() {
    const t = Date.now()
    const DiscordApp = require('@chinokafuu/discord')
    const state = new DiscordApp(this.state)
    state.start()
    this.end(t)
  }
}