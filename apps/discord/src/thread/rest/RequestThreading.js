import { Client, RequestHandler } from 'eris'
import { Worker, isMainThread, parentPort } from 'node:worker_threads'
import { Logger } from '../../structures/util'
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))
export class BotInstance extends Client {
  constructor() {
    super(process.env.DISCORD_TOKEN, {
      rest: {
        baseURL: '/api/v9',
        disableLatencyCompensation: true
      }
    })

    if (!isMainThread) {
      this.on('error', (error) => Logger.error(error))
      this.on('debug', (message) => {
        if (process.env.PRODUCTION === 'false') {
          Logger.debug(message)
        }
      })
      this.on('rawREST', (request) => {
        if (request?.file?.file !== undefined) {
          request.file = null
        }
        if (request.body !== undefined) {
          request.body = null
        }
      })
      this.on('warn', (message) => {
        Logger.warning(message)
      })
    }
  }
}

export class RequestThreading extends RequestHandler {
  constructor() {
    super(new BotInstance(), {
      baseURL: '/api/v10'
    })
    parentPort.on('message', async (data) => {
      try {
        await this.createRequest(data).catch((e) => { })
      } catch (err) {
        console.error(err)
      }
    })

  }

  async createRequest(data) {
    return new Promise((resolve) => {
      try {
        this.request(...(data.args))
          .then((requestData) => {
            parentPort.postMessage({ id: data.id, error: false, data: requestData })
            data = null
          })
          .catch((err) => {
            parentPort.postMessage({ id: data.id, error: true, data: err })
            data = null
          })

      } catch (err) {
        parentPort.postMessage({ id: data.id, error: true, data: err })
        data = null
      }
    })
  }
}

export class RequestWorker {
  #worker;

  #buckets;

  #moveThread;

  constructor(client) {
    this.client = client
    /**
     * @type {Worker[]}
     */
    this.#worker = []
    this.#buckets = []
    this.#init()
    this.#moveThread = 0
  }

  get getThreadsWorking() {
    return this.#worker.length
  }

  getThread(endpoint) {
    return this.#buckets.length % this.#worker.length
  }

  async #init() {
    const maxThread = Number(process?.env?.MAX_THREAD_REST ?? 1)
    for (let i = 0; i < maxThread; i++) {
      if (i > 0) await sleep(70 * 1000)
      const create = () => {
        const threadWorker = new Worker('./src/thread/rest/RequestThreading', {
          name: `Rest Thread (${i})`,
          workerData: {
            name: `Rest Thread (${i})`
          },
          resourceLimits: {
            maxYoungGenerationSizeMb: 1024 * 9009990,
          }
        })
        threadWorker.once('exit', () => {
          Logger.error(`Rest Thread ${i} died, restarting back to the queue.`)
          this.#worker.splice(this.#worker.findIndex((thread) => thread.threadId == threadWorker.threadId), 1)
          this.#worker.push(create())
        })
        threadWorker.on('message', ({ id, error, data }) => {
          const workerFunctionIndex = this.#buckets.findIndex((w) => w.id == id)
          if (workerFunctionIndex != undefined && workerFunctionIndex != -1) {
            const workerFunction = this.#buckets.find((w) => w.id == id)
            if (id === id && error == false) {
              workerFunction.resolve(data)
            } else if (error == true) {
              workerFunction.reject(data)
            }

            this.#buckets.splice(workerFunctionIndex, 1)
          }
          data = null
          id = null
        })
        return threadWorker
      }
      this.#worker.push(create())
    }
  }

  request(...args) {
    const [method, endpoint] = args
    const worker = this.#worker[this.getThread(endpoint)]
    return new Promise((resolve, reject) => {
      const genID = String(Math.floor(Math.random() * (1000000000000 * 10000000)))
      this.#buckets.push({ id: genID, resolve, reject, threads: 0, endpoint })
      worker.postMessage({ id: genID, args: args })
    })
  }
}

const startThreading = () => {
  try {
    new RequestThreading()
    // eslint-disable-next-line no-empty
  } catch (_) { }
}

if (!isMainThread) startThreading()