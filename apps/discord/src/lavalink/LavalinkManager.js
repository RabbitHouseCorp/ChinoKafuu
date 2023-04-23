import { Manager } from '@lavacord/eris'
import EventEmitter from 'events'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Logger } from '../structures/util'
import { LavalinkPlayer } from './LavalinkPlayer'

const load = (path = '') => {
  let file = null
  let detectFileExample = false
  let loaded = false
  if (path.endsWith('.example')) {
    detectFileExample = true
  }
  try {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    file = readFileSync(path)
    loaded = true
  } catch (err) {
    if ((err.message.search(/ENOENT/g) === 0) && !detectFileExample) {
      Logger.info('The Lavalink configuration was not loaded because the file called "LavalinkConfig.json" in the "src/lavalink" directory was not created or could not be found.')
    } else {
      loaded = false
      if (!detectFileExample) {
        Logger.error(err)
      }

    }
  }

  return {
    loaded,
    detectFileExample,
    file: file === null ? null : [...JSON.parse(file).connect]
  }
}
// fallback for test env
const loadSettings = () => {
  const pathLavalinkConfig = resolve('src', 'lavalink', 'LavalinkConfig.json')
  const pathLavalinkConfigExample = resolve('src', 'lavalink', 'LavalinkConfig.json.example')
  const loadConfigurationLavalink = load(pathLavalinkConfig)
  const loadConfigurationLavalinkExample = load(pathLavalinkConfigExample)

  if (loadConfigurationLavalink.loaded && loadConfigurationLavalinkExample.loaded) {
    Logger.warning('So the directory doesn\'t get messed up you can remove `LavalinkConfig.json.example`')
  }

  if (loadConfigurationLavalink.loaded) {
    Logger.info(`The directory of ${pathLavalinkConfig} successfully loaded Lavalink configuration!`)
  } else {
    return undefined
  }

  return loadConfigurationLavalink.file
}

const connect = loadSettings()
export class LavalinkManager extends EventEmitter {
  constructor(client) {
    super()
    this.client = client

    if (!(connect !== undefined)) {
      this.emit('state', (false))
    }
    /**
     * @description
     * @type {TrackData?}
     */
    this.track = null
    this.default = false

    if (this.default === false) {
      this.on('setManager', (client) => {
        if (connect !== undefined) {

          this.client = client
          this.default = true
          this.manager = new Manager(this.client, connect, {
            user: this.client.user.id,
            shards: parseInt(process.env.SHARD_COUNT)
          })
          this.manager.connect().catch(() => Logger.error('I\'m unable to connect to Lavalink, sorry...'))
        }
      })
    }
  }

  getBestHost() {
    return connect[Math.floor(Math.random() * connect.length)].id
  }

  async connect() {
    try {
      await this.manager.connect()
      Logger.info('Lavalink nodes has been sucessfully connected.')
    } catch {
      Logger.warning('Lavalink nodes aren\'t connected.')
    }
  }

  async join(channel) {
    const manager = await this.manager.join({ channel, guild: this.client.getChannel(channel).guild.id, node: this.getBestHost() }, { selfdeaf: true })
    return new LavalinkPlayer(manager, this)
  }
}
