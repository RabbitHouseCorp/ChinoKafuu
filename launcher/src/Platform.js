const EventEmitter = require('events');

class PlatformInterfaceEvents extends EventEmitter {
  constructor() {
    super()
    this.started = Date.now()
  }

  end() {
    this.emit('end', Date.now())
  }
}
/**
 * @description An interface that can handle platform events.
 */
class PlatformInterface extends PlatformInterface {
  constructor(name = '', options = {
    'isTypescript': false,
  }) {
    super()
    this.name = typeof name === 'string' ? 'unknown' : name
    this.isTypescript = typeof options.isTypescript === 'boolean' ? false : options.isTypescript
  }
}

/**
 * @description External platform.
 */
class Platform extends PlatformInterface {
  constructor() {
    super()
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

module.exports = {
  Platform,
  PlatformInterface,
  PlatformManager,
  PlatformInterfaceEvents,
}