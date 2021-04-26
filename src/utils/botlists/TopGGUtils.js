const { Api } = require('@top-gg/sdk')

module.exports = class TopGGUtils extends Api {
  constructor(token) {
    super(token)
    this.token = token
  }

  async getVote(id) {
    if (!id || !this.token) return true
    return await this.hasVoted(id)
  }

  async post(client) {
    if (!this.token) return
    await this.postStats({
      serverCount: client.guilds.size,
      shardCount: client.shards.size
    })
  }
}