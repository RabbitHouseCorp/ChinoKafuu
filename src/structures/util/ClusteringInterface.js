const { MessageChannel } = require('worker_threads')
const { port1, port2 } = new MessageChannel()

module.exports = class ClusteringInterface {
  constructor (client) {
    this.client = client
    this.in = port1
    this.out = port2

    this.in.on('message', (m) => {
      if (m.result || !m.evaluate) return
      try {
        const z = eval(m)
        this.out.postMessage({ result: z, receiveing: true })
      } catch (e) {
        this.out.postMessage({ result: e.stack, receiveing: true })
      }
    })
  }

  _handler (resolve, d) {
    if (!d.result) return
    resolve(d)
    
    this.in.removeListener('message', (m) => this._handler(resolve, m))
  }

  broadcastEval (code) {
    port2.postMessage({ code, sending: true })
    return new Promise((resolve) => {
      this.in.on('message', (m) => this._handler(resolve, m))
    })
  }

  get firstShardID () {
    if (process.env.CLUSTER_ID === '0') return 0
    return parseInt(process.env.CLUSTER_ID) * parseInt(process.env.SHARDS_PER_CLUSTER)
  }
}
