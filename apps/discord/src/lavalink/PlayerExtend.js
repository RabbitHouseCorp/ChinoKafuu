
import { Player } from 'sirius'
import { Logger } from '../structures/util'

export class PlayerExtend {
  /**
   *
   * @param {Player} player
   */
  constructor(player, deletePlayer) {
    this.track = null
    if (typeof deletePlayer === 'function') {
      this.deletePlayer = deletePlayer
    } else {
      this.deletePlayer = null
    }
    this.paused = false
    this.player = player
    player
      .on('onTrackStart', (track) => this.track = track)
      .on('onTrackException', (track, exception) => {
        Logger.error(`ErrorTrack(${player.getPlayerID}): ${exception.message}`)
        player.playTrack(track)
      })
      .on('onTrackStuck', (track) => player.playTrack(track))
      .on('onTrackEnd', (track) => player.playTrack(track))
      .on('stop', () => this.delete())
  }

  preparePlayer(channelID, options) {
    return new Promise((resolve, reject) => {
      this.connect(channelID, options)
      if (this.player.isPlayingTrack) return resolve(true)
      this.loadTrack().then((trackResult) => {
        if (!trackResult.hasAudioTrackInMetadata)
          return reject(Error('Track not available!'))
        const track = trackResult.track
        if (track === null) return reject(Error('The track search was successful, but the track was not found!'))
        this.player.playTrack(track)
          .then(() => resolve(true))
          .catch((error) => reject(error))
      }).catch((error) => reject(error))
    })
  }

  setVolume(volume, limit) {
    return this.player.setVolume(volume, limit)
  }

  pausePlayer(pause) {
    if (pause) this.paused = pause
    return this.player.pausePlayer(pause ? pause : this.paused = !this.paused)
  }

  stopPlayer() {
    return this.player.stopPlayer()
  }

  disconnect() {
    return this.player.disconnectVoice()
  }

  connect(channelID) {
    return this.player.connectVoice(channelID)
  }

  reconnect() {
    return this.player.reconnectVoice()
  }

  movePlayer(channelID) {
    return this.connect(channelID)
  }

  loadTrack() {
    return this.player.loadTrack(process.env.ANIMU_STREAM_URI)
  }

  playTrack(track, options = { noReplace: false }) {
    return this.player.playTrack(track, { ...options })
  }

  destroyPlayer() {
    return this.player.destroyPlayer()
  }

  delete() {
    this.player.removeAllListeners()
    if (this.player.voiceInfo?.status === 'connected' || this.player.voiceInfo?.status === 'waitingNodeResponse') {
      this.disconnect()
    }

    if (this.player.isPlayingTrack)
      this.stopPlayer()
    if (this.deletePlayer != null) {
      this.deletePlayer()
    }
    this.destroyPlayer()
  }
}