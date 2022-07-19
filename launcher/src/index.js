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

  // Adding delay for execute others functions.
  setTimeout(() => new Runner().register(), 2 * 1000)
  require(('../../projectwrapper.build'))
}