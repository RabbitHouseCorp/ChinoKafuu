/* eslint-disable no-unused-vars */
const { PlatformPackage } = require('../Platform');
const { LoggerWrapper } = require('../../../utils/src/LoggerWrapper')
module.exports = class Revolt extends PlatformPackage.Platform {
  constructor(state) {
    super('revolt', {
      'isTypescript': true
    });
    this.state = state
    this.loaded = false
    this.statePlatforms = {
      app: null
    }
  }

  // Starting the Discord Application!
  runner() {
    const t = Date.now()
    const loaders = []
    this.clearCacheOfPackage()

    const { StateApplication } = require('@chinokafuu/revolt')
    const state = new StateApplication(this.state)
    this.statePlatforms.app = state
    this.statePlatforms.app.start()
    this.end(t)
  }
}