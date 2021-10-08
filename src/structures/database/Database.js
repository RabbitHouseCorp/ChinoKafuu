const Logger = require('../util/Logger')
const command = require('./collections/Command')
const guild = require('./collections/Guild')
const user = require('./collections/User')
const Collection = require('./Collection')
const mongoose = require('mongoose')
const EventEmitter = require('events')

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
                      object_a.data.query.push({ took_off: Date.now() - t_data, data: newData, saved: null, tag: tag, collection: this[tag] })
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
                  break;
                case '$': {
                  let b = null
                  if (!(objData.noFetchData == true)) {
                    b = await map.get(tag).model.findOne(objData.fetch)
                  }
                  if (b == null) {

                    if (!(objData.data !== undefined)) {
                      t_data = Date.now()
                      saveData++
                      const id_data = objData.fetch.id
                      const d_data = objData.data ?? {}
                      const newData = await this[tag].model({ id_data, ...d_data }).save()
                      if (newData.id !== undefined) {
                        object_a.data.query[c] = { took_off: Date.now() - t_data, data: newData, saved: null, tag: tag, collection: this[tag] }
                      }
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
                    if (b.id !== undefined) {
                      object_a.data.query[c] = { took_off: Date.now() - t_data, data: null, saved: $a, tag: tag, collection: this[tag] }
                    } else {
                      object_a.data.query[c] = { took_off: Date.now() - t_data, data: null, saved: $a, tag: tag, collection: this[tag] }
                    }
                  }
                }
                  break;
                case 'map': {
                  let b = null
                  if (!(objData.noFetchData == true)) {
                    b = await map.get(tag).model.findOne(objData.fetch)
                  }
                  if (b == null) {
                    if (!(objData.data !== undefined)) {
                      t_data = Date.now()
                      saveData++
                      const id_data = objData.fetch.id
                      const d_data = objData.data ?? {}
                      const newData = await this[tag].model({ id_data, ...d_data }).save()
                      if (newData.id !== undefined) {
                        object_a.data.query.set(b.id, { took_off: Date.now() - t_data, data: newData, saved: null, tag: tag, collection: this[tag] })
                      }
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
                    if (b.id !== undefined) {
                      object_a.data.query.set(b.id, { took_off: Date.now() - t_data, data: b, saved: $a, tag: tag, collection: this[tag] })
                    } else {
                      object_a.data.query.set(c, { took_off: Date.now() - t_data, data: b, saved: $a, tag: tag, collection: this[tag] })
                    }
                  }
                }
                  break;
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
    object_a.took_off = Date.now() - time
    return object_a
  }
}
