const { EventEmitter } = require('events')
class LavalinkPlayer extends EventEmitter {
    constructor(player) {
        super()
        this.player = player
        this.queue = []
        this.nowPlaying = ''
        this.repeatTrack = ''
        this.repeat = false
    }

    play(query) {
        return getSongs(this.player.node, `ytsearch:${query}`).then(song => {
            if (!song[0]) return null
            this._addToQueue(song[0])
            return song[0].info
        })
    }

    skip() {
        const nextSong = this.queue.shift()
        if (!nextSong) return
        this.player.play(nextSong.track)
        this.nowPlaying = nextSong.info
        this.repeatTrack = nextSong.track
    }

    setVolume(volume) {
        if (volume > 100) volume = 100
        return this.player.volume(volume)
    }

    seek(position) {
        return this.player.seek(position)
    }

    pause() {
        return this.player.paused ? this.player.resume() : this.player.pause()
    }

    shuffle() {
        return this.queue.sort(() => Math.random() > 0.5 ? -1 : 1)
    }

    _addToQueue(track) {
        if (!this.player.playing && !this.player.paused) {
            return this._play(track)
        }

        return this.queue.push(track)
    }

    _play(song) {
        this.player.on('end', (data) => {
            if (data.reason === 'REPLACED') return
            if (this.repeat) {
                return this.player.play(this.repeatTrack)
            }
            const nextSong = this.queue.shift()
            if (!nextSong) return this.emit('EmptyQueue')
            this.player.play(nextSong.track)
            this.repeatTrack = nextSong.track
            this.nowPlaying = nextSong.info
        })
        this.player.play(song.track)
        this.nowPlaying = song.info
        this.repeatTrack = song.track
        return this.emit('nowPlaying', song)
    }
}

module.exports = LavalinkPlayer

async function getSongs(node, search) {
    const fetch = require('node-fetch')
    const { URLSearchParams } = require('url')
    const params = new URLSearchParams()
    params.append('identifier', search)

    return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, { headers: { Authorization: node.password } }).then(res => res.json()).then(data => data.tracks).catch(err => {
        console.error(err)
        return null
    })
}
