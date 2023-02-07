import { resolve } from 'path'
import { Registry } from '../registry/Registry'
export class InteractionFunctionRegistry extends Registry {
  constructor(path = resolve('src/interactionFunctions')) {
    super({ path, autoReload: process.env.ENABLE_REGISTRY_RELOAD || !process.env.PRODUCTION })

    this.loadAll(this.path)
  }

  findByName(name) {
    return this.findByProperty('interactionName', name)
  }

  filterByCategory(category) {

    return this.modules.filter((cmd) =>
      cmd.__path
        .replace(/(\/+|\\+)([a-zA-Z0-9_.,]+)\.js/, '') // Remove file name.
        .trim()
        .replace(/(.(.*)(interactionFunctions)|(\/+|\\+)|(^[a-zA-Z0-9_.,])(\/+|\\+))/, '') // Remove all encounters from the folder.
        .split(/(\\+|\/+)/g).includes(category))
  }
}
