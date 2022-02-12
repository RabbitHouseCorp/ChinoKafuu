const PluginExtend = require('../loaders/PluginExtend')
const Constants = require('../../Constants')
module.exports = class BuildStore extends PluginExtend {
  constructor() {
    super({
      name: 'buildStore',
      args: {},
      timeout: 50 * 1000
    })

  }

  async start() {
    try {
      const data = await Constants.BUILD_INFO.getCommit()
      this.$addClassState({ data: data })

      this.ready()
    } catch (err) {
      console.log(err)
      this.fail(err)
    }
  }
}
