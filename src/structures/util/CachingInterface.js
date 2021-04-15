const Redis = require('ioredis')

module.exports = class ClusteringInterface {
  constructor () {
    this.pub = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')
    this.sub = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')
  }
  
  subscribe () {
    this.sub.subscribe('request-data',)
  }
  
  async getShards () {
    let data = this.pub.get('chino-clusters')
    data = JSON.
  }
}