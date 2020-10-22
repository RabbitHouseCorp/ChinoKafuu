const { EventEmitter } = require('events')

class ReactionCollector extends EventEmitter {
    constructor(message, filter, options = {}) {
        super()

        this.message = message
        this.filter = filter
        this.client = message.channel.guild.shard.client || message.channel._client
        this.verify = this.verify.bind(this)
        this.isEnded = false
        this.collectedSize = 0

        this.options = {
            max: options.max ? options.max : 5,
            time: options.time ? options.time : 30000
        }
        this.initializeListeners()
    }

    initializeListeners() {
        setTimeout(() => this.stopListeners('timeEnded'), this.options.time)
        this.client.on('messageReactionAdd', this.verify)
    }

    stopListeners(reason = null) {
        if (this.isEnded) return
        this.client.removeListener('messageReactionAdd', this.verify)
        this.isEnded = true
        return this.emit('end', reason)
    }

    async verify(message, emoji, userid) {
        if (this.message.id !== message.id) return null
        const user = await this.client.users.get(userid)
        if (this.filter(emoji, user)) {
            this.collectedSize += 1
            if (this.collectedSize > this.options.max) return this.stopListeners('maxReactions')
            this.emit('collect', { emoji, user })
            return true
        }
        return null
    }
}

module.exports = ReactionCollector
