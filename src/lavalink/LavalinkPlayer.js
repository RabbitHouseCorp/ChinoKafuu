const { EventEmitter } = require('events')
const Logger = require('../Logger')
module.exports = class LavalinkPlayer extends EventEmitter {
    constructor(player) {
        super()
        this.player = player
        this.queue = []
        this.np = ''
        this.repeatTrack = ''
        this.repeat = false
    }

    async getSongs(node, search) {
        const fetch = require('node-fetch')
        const { URLSearchParams } = require('url')
        const params = new URLSearchParams()
        params.append('identifier', search)

        return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, { headers: { Authorization: node.password } }).then(res => res.json()).then(data => data.tracks).catch(err => {
            Logger.error(err.message)
            return null
        })
    }

    play(query) {
        return this.getSongs(this.player.node, `ytsearch:${query}`).then(result => {
            if (!result[0]) return
            this._addToQueue(result[0])
            return result[0].info
        })
    }

    skip() {
        let queue = this.queue.shift()
        if (!queue) return
        this.player.play(queue.track)
        this.np = queue.info
        this.repeatTrack = queue.track
    }

    setVolume(value) {
        if (value > 100) value = 100
        return this.player.volume(value)
    }

    pause() {
        return this.player.paused ? this.player.resume() : this.player.pause()
    }

    shuffle() {
        return this.queue.sort(() => Math.random() > 0.5 ? -1 : 1)
    }

    _addToQueue(track) {
        if (!this.player.playing && !this.player.paused) return this._play(track)
        return this.queue.push(track)
    }

    _play(song) {
        this.player.on('end', (data) => {
            if (data.reason === 'REPLACED') return
            if (this.repeat) {
                return this.player.play(this.repeatTrack)
            } else {
                let queue = this.queue.shift()
                if (!queue) return this.emit('playEnd')
                this.player.play(queue.track)
                this.repeatTrack = queue.track
                this.np = queue.info
            }
        })

        this.player.play(song.track)
        this.np = song.info
        this.repeatTrack = song.track
        return this.emit('playNow', song)
    }
}