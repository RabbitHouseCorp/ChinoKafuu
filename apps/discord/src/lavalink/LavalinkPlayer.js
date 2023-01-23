import axios from 'axios'
import { EventEmitter } from 'events'
import { URLSearchParams } from 'url'
import { Logger } from '../structures/util'

export class LavalinkPlayer extends EventEmitter {
  constructor(player, clientManager) {
    super()
    this.clientManager = clientManager
    this.player = player
    this.queue = []
    this.np = ''
  }

  async getSongs(node, search) {
    const params = new URLSearchParams()
    params.append('identifier', search)
    try {
      const res = await axios.get(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, {
        headers: {
          Authorization: node.password
        }
      })

      return res.data.tracks
    } catch (err) {
      Logger.error(err.message)
      return null
    }
  }

  playAnimu() {
    if (this.clientManager.track === null) {
      return this.getSongs(this.player.node, process.env.ANIMU_STREAM_URI).then(async result => {
        if (!result[0]) return
        this._addToQueue(result[0])
        return result[0].info
      })
    } else {
      this._addToQueue(this.clientManager.track)
      return this.clientManager.track.info
    }
  }

  setVolume(value) {
    if (value > 100) value = 100
    return this.player.volume(value)
  }

  _addToQueue(track) {
    this.queue.shift()
    if (!this.player.playing && !this.player.paused) return this._play(track)
    return this.queue.push(track)
  }

  _play(song) {
    this.player.on('end', (data) => {
      if (data.reason === 'REPLACED') return
      const queue = this.queue.shift()
      if (!queue) return this.emit('playEnd')
    })
    this.clientManager.track = song
    this.player.play(song.track)
    this.np = song.info
    this.repeatTrack = song.track
    return this.emit('playNow', song)
  }
}
