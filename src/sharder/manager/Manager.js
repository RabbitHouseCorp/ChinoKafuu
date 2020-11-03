const Logger = require('../../structures/util/Logger')
const { Worker } = require('worker_threads')
const path = require('path')
const os = require('os-utils')
const { parentPort } = require('worker_threads')

module.exports = class Manager {
  constructor() {
    this.clusterAmount = parseInt(process.env.CLUSTER_AMOUNT) || require('os').cpus().length || 6
    this.shardsPerCluster = Math.round(parseInt(process.env.SHARD_AMOUNT) / this.clusterAmount)
    this.aliveClusters = 0
    this.clusters = []
    this.resultList = []
    
    if (process.env.PRODUCTION !== 'true') {
      Logger.info('The bot is running in development mode. Your console will get messy.')

      setInterval(() => {
        os.cpuUsage(function (u) {
          Logger.info(`Resource usage:\n Memory ${Math.round(os.freemem())}MB/${Math.round(os.totalmem()) / 1000}GB (${Math.round(os.freememPercentage())}% usage)\n CPU: ${u}% usage ${Math.round(os.loadavg(1))}% load avg/1m.`)
        })
      }, 60 * 1000)
    }
  }

  start() {
    Logger.info(`Spawning ${this.clusterAmount} clusters, each one with ${this.shardsPerCluster} ${this.shardsPerCluster === 1 ? 'shard' : 'shards'}.`)
    this.spawnClusters()
  }

  createCluster(id, env) {
    const worker = new Worker(path.resolve(__dirname + '/../', 'cluster.js'), {
      env: env ? { ...process.env, ...env } : {
        ...process.env,
        CLUSTER_ID: id,
        SHARDS_PER_CLUSTER: this.shardsPerCluster
      }
    })
    worker.on('exit', () => this.onExit(id))
    worker.on('error', (err) => this.onError(id, err))
    worker.on('message', (m) => {
      console.log(m)
      if (m.sending) {
        const execID = Date.now()
        this.resultList.push({ execID, results: [], requestedBy: id })
        
        this.clusters.forEach(x => x.postMessage({ evaluate: true, execID, code: m.code }))
      } else if (m.receiving) {
        console.log('jesus voltou! ' + m)
        const executorIndex = this.resultList.findIndex(x => x.execID === m.execID)
        const executor = this.resultList[executorIndex]
        
        if (!executor || executorIndex < 0) return Logger.fatalError('Broadcast eval result message sent an invalid executor ID! Fix your code, you dum-dum.')
        executor.results.push({ clusterID: id, result: m.result })
        this.resultList[executorIndex] = executor
        if (executor.results.length === this.aliveClusters) {
          this.clusters[executor.requestedBy].postMessage({ results: executor.results, result: true })
          this.resultList.splice(executorIndex, 1)
        }
      }
    })
    this.aliveClusters++
    return worker
  }

  spawnClusters() {
    this.clusters = new Array(this.clusterAmount).fill(0).map((_, i) => this.createCluster(i))
  }

  onExit(worker) {
    this.aliveClusters--
    Logger.error(`Mayday! Cluster ${worker} died! Starting another cluster now.`)
    this.clusters[worker] = this.createCluster(worker)
  }

  onError(id, error) {
    Logger.error(`Cluster ${id} returned an error: ${error.stack}`)
  }
}
