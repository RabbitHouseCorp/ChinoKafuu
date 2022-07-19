const { PlatformPackage } = require('./Platform')
const Discord = require('./platforms/Discord')
class Runner {
  constructor() {
    this.platformManager = new PlatformPackage.PlatformManager()
  }

  register() {
    this.platformManager.addPlatform([
      // new Discord(this)
    ])

    for (const p of this.platformManager.platforms) {
      this.platformManager.platforms.get(p[0]).runner()
    }
  }
}

module.exports.Run = () => {
  new Runner().register()
  require(('../../projectwrapper.build'))
}