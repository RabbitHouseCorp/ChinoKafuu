import { EventEmitter } from 'events'
import { WebSocketServer } from 'ws'
import { LoggerSystem } from '../logger/defineLogger.js'
import { ProcessModel } from './model/ProcessModel.js'
const isDeveloperMode = () => process.argv.includes('--dev')
const enableServer = () => process.argv.includes('--watch-server')
const logger = new LoggerSystem('WebsocketServerDeveloper')
const nameCute = () => {
  const name = ['Cocoa', 'Chino', 'Rize', 'Sharo', 'Tippy']
  return name[Math.floor(Math.random() * name.length)]
}

const ClientWebsocket = (options = {
  type: 'client',
  ip: '',
  port: '',
  latency: 0,
  process: null,
  trackProject: null,
  terminal: null,
  request: null,
  socket: null
}) => ({
  type: 'client',
  name: nameCute(),
  ip: '',
  port: '',
  latency: '',
  process: '',
  trackProject: '',
  terminal: '',
  request: null,
  ...options
})


export class WebSocketServerDeveloper extends EventEmitter {
  constructor(nodes) {
    super()
    if (!isDeveloperMode()) return
    this.nodes = nodes
    this.clients = new Array()

    this.ws = new WebSocketServer({
      port: 24607,
      perMessageDeflate: {
        clientNoContextTakeover: true,
        serverNoContextTakeover: true,
        serverMaxWindowBits: 10,
        concurrencyLimit: 10,
        threshold: 1024
      }
    })

    this.ws.on('error', (err) => {
      logger.error(err)
    })
    this.ws.on('connection', (socket, request) => {
      const family = (request.socket.remoteAddress !== '::1' && request.socket.remoteAddress !== '0.0.0.0');
      const family2 = (request.socket.remoteAddress !== '::ffff:127.0.0.1' && request.socket.remoteAddress !== '127.0.0.1')
      if (!family2 && !family) {
        socket.close()
        return
      }

      const client = ClientWebsocket({
        type: request.headers['watch'] === undefined ? 'client' : 'watch',
        ip: request.socket.remoteAddress,
        port: request.socket.remotePort,
        latency: -1,
        process: process.execPath,
        trackProject: '',
        terminal: null,
        request,
        socket
      })

      if (client.type === 'client') {
        logger.log(`${client.name} connected in the communication center of develop. (${client.ip + `:${client.port}`})`)
        this.addClient(client, socket, request)
      } else {
        this.addWatchClient(client, socket, request)
      }
    })
    this.ws.on('listening', () => logger.debug(`Server listening port on 24607`))
    this.on('message', (data) => {
      this.sendMessageForWatchers(data)
    })
  }

  addWatchClient(client, socket, request) {
    this.clients.push(client)
  }

  sendMessageForWatchers() {
    const clientWatcher = this.clients.filter((i) => i.type === 'watch')
    const clients = this.clients.filter((i) => i.type === 'client')

    const getInformations = clients.map((i) => {
      const stateProcess = i.project.clientState.stateProcess
      const commandStats = i.project.clientState.commandStats
      const listeners = i.project.clientState.listeners
      const stateGlobal = i.project.clientState.stateGlobal
      return {
        d: {
          projectName: i.project.getNameProject(),
          stateProcess,
          commandStats,
          listeners,
          stateGlobal
        }
      }
    })
    for (const client of clientWatcher) {
      client.socket.send(JSON.stringify(getInformations))
    }
  }

  addClient(client, socket, request) {

    this.clients.push(client)

    socket.on('message', (message) => {
      const json = JSON.parse(message)
      const parseModel = ProcessModel(json)

      if (parseModel.t === 'process') {

        try {
          const node = this.nodes.searchNode(parseModel.d.projectName).clientState = {
            client,
            stateProcess: parseModel
          }
          client.project = this.nodes.searchNode(parseModel.d.projectName)
          this.emit('message', parseModel)

        } catch (e) {
          console.log(e)
        }
      } else if (parseModel.t === 'commandStats') {
        this.nodes.searchNode(parseModel.d.projectName).clientState.commandStats = json.d
      } else if (parseModel.t === 'listenerStats') {
        this.nodes.searchNode(parseModel.d.projectName).clientState.listeners = json.d
      } else if (parseModel.t === 'stateGlobal') {
        this.nodes.searchNode(parseModel.d.projectName).clientState.stateGlobal = json.d
      }
    })
  }
}