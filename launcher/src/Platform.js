const EventEmitter = require('events');

class PlatformInterfaceEvents extends EventEmitter {
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

  runner() {}
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
}