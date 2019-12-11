module.exports = class ShardManager {
  constructor (client) {
    this.client = client
  }

  async getFromCollection (collection, id) {
    const data = await this.client.shard.broadcastEval(`this.${collection}.get('${id}')`).then(a => a.filter(b => b))
    return data[0]
  }

  getEmoji (id) {
    return this.getFromCollection('emojis', id)
  }

  getUser (id) {
    return this.getFromCollection('users', id)
  }

  getGuild (id) {
    return this.getFromCollection('guilds', id)
  }

  getChannel (id) {
    return this.getFromCollection('channels', id)
  }

  killShard (id) {
    return this.client.shard.broadcastEval(`if (this.shard.id === ${id}) { this.destroy() }`)
  }
}
