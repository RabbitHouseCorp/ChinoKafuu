const { readdirSync, lstatSync } = require('fs')
const Logger = require('../../structures/util/Logger')
const { EventEmitter } = require('events')
const hound = require('hound')
const path = require('path')
const { resolve } = require('path')

module.exports = class Registry extends EventEmitter {
  constructor (options) {
    super()

    this.path = path.resolve(options.path) || process.exit()
    this.autoReload = options.autoReload || true

    this.modules = []
    if (this.autoReload) this.startWatcher()
  }

  loadModule (path) {
    try {
      delete require.cache[require.resolve(path)]
      const module = new (require(path))()
      if (this.modules.filter((a) => a.__path === path)[0]) return true

      module.__path = path
      this.modules.push(module)

      this.emit('load', module)
      return true
    } catch (e) {
      Logger.error(`Error loading ${path}: ${e.stack}`)
      return false
    }
  }

  loadAll (path) {
    readdirSync(path).forEach((file) => {
      const fullpath = resolve(path, file)
      if (lstatSync(fullpath).isDirectory()) {
        return this.loadAll(fullpath)
      }
      this.loadModule(fullpath)
    })
  }

  deleteModule (obj) {
    this.modules.splice(this.modules.findIndex((a) => a.__path === obj.__path), 1)
    this.emit('removal', obj)
  }

  reloadModule (object, safeReload = true) {
    const obj = this.modules.filter(a => a.__path === object.__path)[0]
    this.deleteModule(obj)
    if (this.loadModule(obj.__path)) {
      return true
    } else {
      if (safeReload) {
        this.modules.push(obj)
        this.emit('load', obj)
      }
      return false
    }
  }

  reloadAllModules (safeReload = true) {
    this.modules.forEach((module) => this.reloadModule(module.__path, safeReload))
  }

  startWatcher () {
    const watcher = hound.watch(this.path)

    watcher.on('create', (file) => setTimeout(() => this.loadAll(this.path), 2000))
    watcher.on('change', (file) => setTimeout(() => this.reloadModule(this.findByFileName(file)), 2000))
    watcher.on('delete', (file) => setTimeout(() => this.deleteModule(this.findByFileName(file)), 2000))
  }

  findByProperty (property, value) {
    return this.modules.filter((a) => a[property] === value)[0]
  }

  findByFileName (path) {
    return this.modules.filter((a) => a.__path === path)[0]
  }
}
