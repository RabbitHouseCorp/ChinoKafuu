const PluginExtend = require('../loaders/PluginExtend');

module.exports = class CacheProfile extends PluginExtend {
  constructor() {
    super({
      name: 'bot',
      args: {},
      timeout: 50 * 1000
    })

  }

  start() {
    this.$addClassState({
      data: {
        $cacheStoreData: new Map(),
        $cacheStore: new Map(),
        check: (USER_ID, state, json) => {
          if (state.$cacheStoreData.get(USER_ID) === undefined) return true
          if (state.$cacheStore.get(USER_ID) === undefined) return true

          const a = JSON.stringify(json);
          if (state.$cacheStoreData.get(USER_ID) === a) return false

          return true
        },
        setCache: (USER_ID, state, json, buffer) => {
          state.$cacheStoreData.add(USER_ID, JSON.stringify(json))
          state.$cacheStore.add(USER_ID, buffer)
        }
      }
    })
    this.ready()
  }
}
