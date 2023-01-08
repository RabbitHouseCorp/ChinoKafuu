import { EventEmitter } from 'events'
import { LoggerSystem } from './logger/defineLogger.js'
import { Node } from './packageManager/builder.js'


const logger = new LoggerSystem('FrameworkRepository')



/**
 * Solving and fitting the knots.
 */
const resolveLink = (n) => {
  const nodes = []
  const unresolved = (node) => {
    logger.debug(`Solving solution from link=${JSON.stringify(node, undefined, '  ')}\n`)
    if (Array.isArray(node)) {
      for (const n of node) {
        if (n.repositoryCheck) {
          nodes.push(new Node(n.path, {
            repositoryCheck: n.repositoryCheck,
            requiredInstallationOfPackages: n.requiredInstallationOfPackages
          })) // Pull this node which is a repository.
        }

        if (Array.isArray(n)) {
          logger.trace(`This is an Array, parsing this data...`)
          unresolved(n) // It's a Array, we gotta explore that Array :/
        }
      }
    }

    return nodes
  }
  return unresolved(n.dirs)
}


/**
 * Implement use of these repositories to be able to control 
 * How to download packages and troubleshoot, hot loading and etc.
 */
export class NodeLinkResolver extends EventEmitter {
  constructor(nodes) {
    super()
    /**
     * Save these nodes to work with repository links.
     */
    this.nodes = nodes
    this.#listenerAll()
  }

  /**
   * Let's listen to these nodes to work with the links.
   * 
   * 
   * OBS: It is not a link to access the internet*
   */
  #listenerAll() {
    for (const n of this.nodes) {
      n.on('debug', (...args) => this.emit('debug', args))
      n.on('warn', (...args) => this.emit('warn', args))
      n.on('log', (...args) => this.emit('log', args))
      n.on('error', (...args) => this.emit('error', args))
      n.on('installing', (...args) => this.emit('installing', args))
      n.on('installed', (...args) => this.emit('installed', args))
      n.on('typescript-state', (...args) => this.emit('typescript-state', args))
      n.on('hotreload', (...args) => this.emit('hotreload', args))
      n.on('developer', (...args) => this.emit('developer', args))
      n.on('ipc', (...args) => this.emit('ipc', args))
      n.on('clustering', (...args) => this.emit('clustering', args))
    }
  }

  /**
   * Search these nodes.
   * @param {*} name 
   * @returns 
   */
  searchNode(name) {
    let node = null
    for (const n of this.nodes) {
      if (node.resolved.endsWith(name) &&
        (node.resolved.endsWith(`name/`) && node.resolved.endsWith(`name\\`))) {
        node = n
        break
      }
    }

    return node
  }

  // Create a new links node.
  static new(nodes) {
    return new NodeLinkResolver(resolveLink(nodes))
  }
}