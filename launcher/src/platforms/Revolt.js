/* eslint-disable no-unused-vars */
const { PlatformPackage } = require('../Platform');

module.exports = class Revolt extends PlatformPackage.Platform {
  constructor(state) {
    super('revolt', {
      'isTypescript': true
    });
    this.state = state

    this.statePlatforms = {
      app: null
    }
  }

  // Starting the Discord Application!
  runner() {
    const t = Date.now()
    delete require.cache[require.resolve('@chinokafuu/revolt')]
    const { StateApplication } = require('@chinokafuu/revolt')
    const state = new StateApplication(this.state)
    this.statePlatforms.app = state
    this.statePlatforms.app.start()
    this.end(t)
  }
}