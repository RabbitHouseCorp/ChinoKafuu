import { Client, RequestHandler } from 'eris'
import { Worker, isMainThread, parentPort } from 'node:worker_threads'
import { Logger } from '../../structures/util'
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))
const defineTypeStatus = (data) => {
  if (data.time >= 100 || data.buckets <= 10) {
    return {
      status: 'LOW',
    }
  } else if (data.time >= 40 || data.buckets <= 90) {
    return {
      status: 'MEDIUM',
    }
  } else if (data.buckets <= 5) {
    return {
      status: 'LOW',
    }
  }

  return {
    status: 'HIGH',
  }
}
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
        await this.createRequest(data).catch(() => { })
      } catch (err) {
        console.error(err)
      }
      data = null
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
  /**
    * @type {Worker[]}
    */
  #worker;

  #buckets;

  #moveThread;

  #time;

  #timeNow;

  #timeTotal;

  #status;

  /**
   * @type {{ threadId: number; activity: number }[]}
   */
  #stats;

  constructor(client) {
    this.client = client

    this.#worker = []
    this.#buckets = []
    this.#stats = []
    this.#init()
    this.#moveThread = 0
    this.#time = null
    this.#timeNow = null
    this.#timeTotal = null
    this.#status = {
      status: 'LOW'
    }
    this.#watch()
  }

  #watch() {
    setInterval(() => {
      if (this.#time != null && this.#timeNow != null) {
        if (this.#timeTotal == this.#timeNow - this.#time) return
        this.#timeTotal = this.#timeNow - this.#time
        this.#status = defineTypeStatus({ time: this.#timeNow - this.#time, buckets: this.#buckets.length })
      }
      // this.#stats
      //   .filter((worker, index) => index != 0 && (Date.now() - worker.activity) >= 60000)
      //   .map((workerStat) => {
      //     const thread = this.#worker.find((worker) => worker.threadId == workerStat.threadId)
      //     if (thread !== undefined) {
      //       thread.terminate()
      //     }
      //   })
    }, 100);
  }

  #apply(id) {
    Object.assign(this.#stats.find((stat) => stat.threadId == this.#worker.at(id).threadId) ?? {}, {
      activity: Date.now()
    })
  }

  get getThreadsWorking() {
    return this.#worker.length
  }

  getThread() {
    let id = 0;
    if (process.env?.THREAD_REST_MODE === 'EACH_FOR_ITSELF') {
      this.#moveThread = (this.#moveThread + 1) % this.#worker.length
      id = this.#moveThread

      this.#apply(id)
      return id
    } else if (process.env?.THREAD_REST_MODE === 'RANDOM') {
      id = Math.floor(Math.random() * this.#worker.length)
      this.#apply(this.#moveThread)
      return this.#moveThread
    }
    id = Math.min(Math.max(Math.floor(Math.log(this.#buckets.length)), 0), this.#worker.length)
    this.#apply(id)
    return id
  }

  async #init() {
    const maxThread = Number(process?.env?.MAX_THREAD_REST ?? 1)
    for (let i = 0; i < maxThread; i++) {
      const active = Math.min(Math.max(Math.floor(1 + Math.log(maxThread)), 0), maxThread)
      const create = () => {
        const threadWorker = new Worker('./src/thread/rest/RequestThreading', {
          eval: false,
          name: `Rest Thread = ${i}`,
          workerData: {
            name: `Rest Thread = ${i}`
          },
          resourceLimits: {
            maxYoungGenerationSizeMb: 1024 * 9009990,
          },
          argv: [process.argv.find((arg) => arg === '--loggerDev') ?? '']
        })
        this.#stats.push({
          threadId: threadWorker.threadId,
          activity: Date.now()
        })
        threadWorker.once('exit', (code) => {
          if (code != 1) {
            Logger.error(`Rest Thread ${i} died, restarting back to the queue.`)
            this.#worker.splice(this.#worker.findIndex((thread) => thread.threadId == threadWorker.threadId), 1)
            this.#worker.push(create())
          }
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
    this.#time = this.#timeNow
    this.#timeNow = Date.now()
    const worker = this.#worker.at(this.getThread())
    return new Promise((resolve, reject) => {
      const genID = String(Math.floor(Math.random() * (1000000000000 * 10000000)))
      this.#buckets.push({ id: genID, resolve, reject, threads: 0 })
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