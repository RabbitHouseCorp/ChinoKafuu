const EventEmitter = require('events');
const { LoggerWrapper } = require('../../utils/src/LoggerWrapper')
class PlatformCacheManager extends
  class extends EventEmitter {
    constructor() {
      super()
    }
  }
{
  constructor() {
    super();
    this.loaded = false
  }

  clearCacheOfPackage() {
    const loaders = []
    if (this.loaded === true) {
      const regex = RegExp(`apps\\/${this.name}|apps\\${this.name}`, 'g')

      // Delete cache all package.
      for (const cache in require.cache) {
        if (cache.match(regex) !== null) {
          loaders.push(loaders)
          delete require.cache[cache]
        }
      }

      LoggerWrapper.log({
        typeLog: 'WARNING',
        message: `${loaders.length} package cache of ${this.name} has been deleted. Injecting the new packages.`,
        project: this.name
      })


      // Delete cache main package.
      delete require.cache[require.resolve('@chinokafuu/revolt')]
    } else {
      this.loaded = true
    }
  }
}


class PlatformInterfaceEvents extends PlatformCacheManager {
  constructor() {
    super()
    this.started = Date.now()
  }

  end(t = 0) {
    this.emit('end', t - Date.now())
  }
}
/**
 * @description An interface that can handle platform events.
 */
class PlatformInterface extends PlatformInterfaceEvents {
  constructor(name = '', options = {
    'isTypescript': false,
  }) {
    super()
    this.name = typeof name === 'string' ? name : 'unknown'
    this.isTypescript = typeof options.isTypescript === 'boolean' ? false : options.isTypescript
  }

  runner() { }
}

/**
 * @description External platform.
 */
class Platform extends PlatformInterface {
  constructor(name = '', options = {
    'isTypescript': false,
  }) {
    super(name, options)
  }
}

/**
 * @description To boot the separate platform. It is global and manageable.
 */
class PlatformManager {
  constructor() {
    this.platforms = new Map()
  }

  addPlatform(platforms = []) {
    for (const platform of platforms) {
      if (platform instanceof Platform) {
        this.platforms.set(platform.name, platform)
      }
    }
  }
}

module.exports.PlatformPackage = {
  Platform,
  PlatformInterface,
  PlatformManager,
  PlatformInterfaceEvents,
  PlatformCacheManager
}