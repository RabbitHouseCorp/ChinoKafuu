/* eslint-disable quotes */
const Logger = require('../util/Logger')
const command = require('./collections/Command')
const guild = require('./collections/Guild')
const user = require('./collections/User')
const Collection = require('./Collection')
const mongoose = require('mongoose')
const EventEmitter = require('events')
const chalk = require('chalk')

module.exports = class Database extends EventEmitter {
  constructor() {
    super()
    if (process.env.MONGO_URI) {
      mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          this.emit('state', (false))
          return Logger.error(`Unable to connect to the database ${err}`)
        }
        this.emit('state', (true))
        Logger.debug('Connected to the database.')
      })
    }

    this.commands = new Collection(command)
    this.guilds = new Collection(guild)
    this.users = new Collection(user)
  }
  async flux(data) {

    const sc = []
    if (Array.isArray(data.search)) {
      for (const k of data.search) {
        sc.push(k)

      }
    }
    const map = new Map()
    const object_a = {}
    const time = Date.now()
    object_a.took_off = 0
    object_a.notFound = {}
    object_a.post = {}
    object_a.errors = {}
    object_a.data = {}
    object_a.search_namespaces = []
    if (data.mode !== undefined) {
      object_a.mode = data.mode
      switch (data.mode) {
        case 'array': {
          object_a.data.query = new Array()
        }
          break;
        case '$': {
          object_a.data.query = {}
        }
          break;
        case 'map': {
          object_a.data.query = new Map()
        }
          break;
        default:
          object_a.mode = 'array'
          object_a.data.query = new Array()
      }
    } else {
      object_a.mode = 'array'
      object_a.size = 0
      object_a.data.query = new Array()
    }

    object_a.entry = {
      tag: null,
      data: data
    }

    object_a.queries = {}
    for (const a in this) {
      const b = this[a]
      if (b instanceof Collection) {
        map.set(`${a}`, b)
      }
    }
    let c = 0


    if (!Array.isArray(data.search)) {
      for (const tag in data.search) {
        const t = Date.now()
        let found = 0
        let notFound = 0
        let saveData = 0
        for (const objData of data.search[tag]) {
          if (!(map.get(tag) == undefined)) {
            c++
            let t_data = Date.now()
            try {
              switch (object_a.mode) {
                case 'array': {
                  if (objData.getOrAdd) {
                    const b = await map.get(tag).model.findOne(objData.fetch)
                    if (b == null) {
                      t_data = Date.now()
                      saveData++
                      const id_data = objData.fetch.id
                      const d_data = objData.data ?? {}
                      if (d_data.id == undefined) {
                        d_data.id = id_data
                      }
                      const newData = await this[tag].model({ ...d_data }).save()
                      object_a.data.query.push({ took_off: Date.now() - t_data, data: newData, saved: newData, tag: tag, collection: this[tag] })
                    } else {
                      found++
                      const $a = null

                      object_a.data.query.push({ took_off: Date.now() - t_data, data: b, saved: $a, tag: tag, collection: this[tag] })
                    }
                  } else {
                    let b = null
                    if (!(objData.noFetchData == true)) {
                      b = await map.get(tag).model.findOne(objData.fetch)
                    }
                    if (b == null) {
                      if (objData.data !== undefined) {
                        t_data = Date.now()
                        saveData++
                        const id_data = objData.fetch.id
                        const d_data = objData.data ?? {}
                        if (d_data.id == undefined) {
                          d_data.id = id_data
                        }
                        const newData = await this[tag].model({ ...d_data }).save()
                        object_a.data.query.push({ took_off: Date.now() - t_data, data: newData, saved: newData, tag: tag, collection: this[tag] })
                      } else {
                        if (!(objData.noFetchData == true)) {
                          notFound++
                        }
                      }
                    } else {
                      found++
                      let $a = null
                      if (objData.data !== undefined) {
                        t_data = Date.now()
                        saveData++
                        const id_data = objData.fetch.id
                        const d_data = objData.data ?? {}
                        $a = await this[tag].model({ id_data, ...d_data }).save()
                      }
                      object_a.data.query.push({ took_off: Date.now() - t_data, data: b, saved: $a, tag: tag, collection: this[tag] })
                    }
                  }
                }
              }


            } catch (err) {
              object_a.errors[c] = {
                error: err,
                data: objData,
                tag: tag
              }
            }
          }
        }
        object_a.queries[tag] = {
          took_off: Date.now() - t,
          success: found,
          notFound: notFound,
          saveData: saveData
        }
      }
    }

    object_a.data.toMap = () => {
      const a = new Map()
      for (const b of object_a.data.query) {
        if (b.data.id !== undefined) {
          a.set(`${b.tag}:${b.data.id}`, b)
        } else {
          a.set(`${b.data.id}`, b)
        }
      }
      return a
    }
    object_a.took_off = Date.now() - time
    this.#logger_receive('get', object_a)
    return object_a
  }



  #logger_receive(action, data) {
    const loggers = []
    loggers.push(' ')
    const list = process.env.FLUX_LOGGER.replace(" ", "").split(",")
    if (list.includes('took')) {
      loggers.push(`Took (${this.#lantecy(data.took_off)})`)
    }
    if (list.includes('get_data')) {
      loggers.push(`GET Data ~> ${JSON.stringify(data.data.query)}`)
    }
    if (list.includes('post_data')) {
      const map = []
      const bar_2 = "____________________"
      for (const b of data.data.query) {
        if (!(b.saved == null)) {
          map.push(`${bar_2}\nTag: ${b.tag}\nTook: ${this.#lantecy(b.took_off)}\n${bar_2}`)
        }
      }
      if (!(map.length == 0)) {
        loggers.push(`Post data:\n${map.join('\n')}`)
      }
    }

    if (list.includes('error')) {
      const bar = chalk.bgRedBright(Array.from({ length: process.stdout.columns }, () => ` `).join(''))
      const bar_2 = "____________________"
          // eslint-disable-next-line keyword-spacing
      const d = (errorInf) => {try { return JSON.stringify(errorInf.data)} catch(_er) { return  errorInf.data}}

      if (Object.values(data.erros ?? []).length > 0) {
        loggers.push(`Errors ${chalk.green('MongoDB')}:\n${bar}\n${Object.values(data.errors).map((errorInf) => { return `${bar_2}\n${chalk.yellow('Tag')}: ${errorInf.tag}\n${chalk.cyan('Data')}: ${d(errorInf)}\n${chalk.red('Error')}:${errorInf.error}\n${bar_2}`})}\n${bar}`)
      }
    }

    if (list.length > 0) {
      Logger.debug(`[FLUX DATA] [MONGODB] ${loggers.length == 1 ? 'no-logger' : loggers.join(`\n | - `)}`)
    }
  }

  #lantecy(latency, emoji) {
    if (latency > 267) {
      return `${chalk.yellow(`${latency}ms`)} --- This is bad! Flow is too slow!`
    }
    if (latency > 100) {
      return `${chalk.yellow(`${latency}ms`)} --- Lightly heavy flow...`
    }
    if (latency > 100) {
      return `${chalk.yellow(`${latency}ms`)} --- Flow is medium${emoji == true ? '🤔' : ''}...`
    }
    if (latency > -100) {
      return `${chalk.green(`${latency}ms`)} --- ${emoji == true ? '🎉' : ''}Woah! Good.${emoji == true ? '🎉' : ''}`
    }




  }
}
