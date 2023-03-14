import chalk from 'chalk'
import EventEmitter from 'events'
import mongoose from 'mongoose'
import { Logger } from '../util/Logger'
import { Collection } from './Collection'
import command from './collections/Command'
import guild from './collections/Guild'
import user from './collections/User'

// It is used to get only the response time, if the latency is high it is necessary to get faster analysis support to improve latency.
const traceLatency = (type, value, database) => {
  if (value > 150 && value > database.highLatency) {
    database.highLatency = value
    Logger.warning(`[MONGODB] Response from getting data of type  { type = ${type} }  has { value = ${value}ms } high latency.`)
  }
  return value
}

/**
 * @template T
 * @param {*} type
 * @param {T} data
 * @param {*} timestamp
 * @param {*} tracing
 * @param {*} database
 * @returns
 */
const query = (queries = 'unknown', type = 'unknown', data = [], timestamp = { original: 0, date: 0, latency: 0 }, tracing = {}, database) => ({
  queries: queries ?? 'unknown',
  typeQuery: type ?? 'unknown',
  data,
  tracing: {
    time: {
      ...timestamp,
      latency: traceLatency(type, (Date.now() - (timestamp.date <= 0 ? Date.now() : timestamp.date)), database)
    },
    ...tracing
  },
  get: (...args) => data.find(...args) ?? null,
  remove: (...args) => {
    const getData = data.indexOf(args)
    return data.splice(getData, 1)
  }
})
/**
 * @template T
 * @param {*} type
 * @param {T} data
 * @param {*} timestamp
 * @param {*} tracing
 * @param {*} database
 * @returns
 */
const dataQuery = (queries = 'unknown', type = 'unknown', data, timestamp = { original: 0, date: 0, latency: 0 }, tracing = {}, database) => ({
  queries: queries ?? 'unknown',
  typeQuery: type ?? 'unknown',
  data,
  tracing: {
    time: {
      ...timestamp,
      latency: traceLatency(type, (Date.now() - (timestamp.date <= 0 ? Date.now() : timestamp.date)), database)
    },
    ...tracing
  },
})

export class Database extends EventEmitter {
  constructor() {
    super()
    /**
     * @type {Collection<command>}
     */
    this.commands = new Collection(command)
    /**
     * @type {Collection<guild>}
     */
    this.guilds = new Collection(guild)
    /**
     * @type {Collection<user>}
     */
    this.users = new Collection(user)
    this.highLatency = 0
    this.#connect()
  }

  #connect() {
    if (process.env.DISCORD_MONGO_URI) {
      mongoose.set('strictQuery', true)
      mongoose.connect(process.env.DISCORD_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          this.emit('state', (false))
          return Logger.error(`Unable to connect to the database ${err}`)
        }
        this.emit('state', (true))
        Logger.debug('Connected to the database.')
      })
    }
  }

  async flux(data) {
    const trackTime = Date.now()
    const guildTimestamp = { original: Date.now(), date: Date.now() }
    const fetchDataGuild = async (id, defaultValues = {}) => dataQuery('guild', id, await this.guilds.getOrCreate(id, defaultValues), guildTimestamp, {}, this)
    const userTimestamp = { original: Date.now(), date: Date.now() }
    const fetchDataUser = async (id, defaultValues = {}) => dataQuery('user', id, await this.users.getOrCreate(id, defaultValues), userTimestamp, {}, this)
    const commandsTimestamp = { original: Date.now(), date: Date.now() }
    const fetchDataCommands = async (id, defaultValues = {}) => dataQuery('commands', id, await this.commands.getOrCreate(id, defaultValues), commandsTimestamp, {}, this)
    const commandsTimestamps = { original: Date.now(), date: Date.now() }
    const commands = await Promise.all(
      data.search.guilds
        .filter((search) => typeof search.fetch.id === 'string')
        .filter((search) => typeof search.data === 'object')
        .map((search) => [search.fetch.id, search.data])
        .map(async ([id, defaultValues]) => query('commands', id, await fetchDataCommands(id, defaultValues), commandsTimestamps, {}, this))
    )
    const guildsTimestamp = { original: Date.now(), date: Date.now() }
    const guilds = await Promise.all(
      data.search.guilds
        .filter((search) => typeof search.fetch.id === 'string')
        .filter((search) => typeof search.data === 'object')
        .map((search) => [search.fetch.id, search.data])
        .map(async ([id, defaultValues]) => query('guilds', id, await fetchDataGuild(id, defaultValues), guildsTimestamp, {}, this))
    )
    const usersTimestamp = { original: Date.now(), date: Date.now(), latency: 0 }
    const users = await Promise.all(
      data.search.users
        .map((search) => [search.fetch.id, search.data])
        .map(async ([id, defaultValues]) => query('users', id, await fetchDataUser(id, defaultValues), usersTimestamp, {}, this))
    )
    const func = {
      data: { guilds, users, commands },
      time: {
        jitter: (Date.now() - trackTime) / 1000 ** 0.1,
        latency: Date.now() - trackTime
      },
      getQuery: (query = '', mouse = (_) => null) => {
        const obj = [[Queries.Guilds, guilds], [Queries.Users, users]]
        const [_, getQueries] = obj.find(([id]) => id === query)
        const getData = getQueries.find(mouse)?.data ?? null
        return getData
      }
    }
    return { ...func }
  }

  logger_receive(action, data) {
    const loggers = []
    loggers.push(' ')
    let list = []
    if (!process.env.FLUX_LOGGER) {
      list = []
    } else {
      process.env.FLUX_LOGGER.replace(' ', '').split(',')
    }
    if (list.includes('took')) {
      loggers.push(`Took (${this.lantecy(data.took_off)})`)
    }
    if (list.includes('get_data')) {
      loggers.push(`GET Data ~> ${JSON.stringify(data.data.query)}`)
    }
    if (list.includes('post_data')) {
      const map = []
      const bar_2 = '____________________'
      for (const b of data.data.query) {
        if (!(b.saved === null)) {
          map.push(`${bar_2}\nTag: ${b.tag}\nTook: ${this.lantecy(b.took_off)}\n${bar_2}`)
        }
      }
      if (!(map.length === 0)) {
        loggers.push(`Post data:\n${map.join('\n')}`)
      }
    }

    if (list.includes('error')) {
      const bar = chalk.bgRedBright(Array.from({ length: process.stdout.columns }, () => ` `).join(''))
      const bar_2 = '____________________'
      // eslint-disable-next-line keyword-spacing
      const d = (errorInf) => { try { return JSON.stringify(errorInf.data) } catch (_er) { return errorInf.data } }

      if (Object.values(data.erros ?? []).length > 0) {
        loggers.push(`Errors ${chalk.green('MongoDB')}:\n${bar}\n${Object.values(data.errors).map((errorInf) => { return `${bar_2}\n${chalk.yellow('Tag')}: ${errorInf.tag}\n${chalk.cyan('Data')}: ${d(errorInf)}\n${chalk.red('Error')}:${errorInf.error}\n${bar_2}` })}\n${bar}`)
      }
    }

    if (list.length > 0) {
      Logger.debug(`[FLUX DATA] [MONGODB] ${loggers.length === 1 ? 'no-logger' : loggers.join(`\n | - `)}`)
    }
  }

  lantecy(latency, emoji) {
    if (latency > 267) {
      return `${chalk.yellow(`${latency}ms`)} --- This is bad! Flow is too slow!`
    }
    if (latency > 100) {
      return `${chalk.yellow(`${latency}ms`)} --- Lightly heavy flow...`
    }
    if (latency > 100) {
      return `${chalk.yellow(`${latency}ms`)} --- Flow is medium${emoji === true ? '🤔' : ''}...`
    }
    if (latency > -100) {
      return `${chalk.green(`${latency}ms`)} --- ${emoji === true ? '🎉' : ''}Woah! Good.${emoji === true ? '🎉' : ''}`
    }

  }
}

export const Queries = {
  Users: 'users',
  Guilds: 'guilds',
  Commands: 'commands'
}
