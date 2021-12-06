const Database = require('../../../structures/database/Database');
const PluginExtend = require('../loaders/PluginExtend');

module.exports = class DatabaseStore extends PluginExtend {
  constructor() {
    super({
      name: 'mongodb',
      args: {},
      timeout: 23 * 1000
    })

  }

  start() {
    try {
      const state = new Database()
      state.on('state', (a) => {
        if (a) {
          this.$addClassState({ data: state })
          this.ready()
        } else {
          this.failed(Error('Unable to connect to the database'))
        }
      })

    } catch (err) {
      this.fail(err)
    }
  }
}
