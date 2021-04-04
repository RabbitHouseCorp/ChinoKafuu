const axios = require('axios')

module.exports = class PolluxClient {
  constructor () {
    this.userGame = new Map()

    /**
         * This is to load all the words so as not to make the command so slow
         */
    this.words = []
    this.reloadWords()
  }

  /**
     * @description This to reload the word list.
     * @returns {this}
     */
  async reloadWords () {
    for (const data of this.words) {
      this.words.pop()
      this.words.pop()
    }
    await this.request('/api/games/hangmaid/words', 'constants').then(res => {
      for (const data of res.data) {
        this.words.push(data)
      }
    })
    return this
  }

  /**
     *
     * @param {*} level Tells the level to search for difficult words
     * @returns {word: "null", theme: "null", level: 0}
     */
  randomWord (level) {
    let first = {
      word: 'null',
      theme: 'null',
      level: 0
    }

    const arrayWord = []

    for (const wordData of this.words) {
      if (`${wordData.level}` === `${level}`) {
        arrayWord.push(wordData)
        /**
                 * Don't ask me, I don't know why number doesn't work and string works.
                 */
      }
    }

    const randomNb = Math.floor(Math.random() * Math.floor(Math.random() * arrayWord.length))

    /**
         * When the item is not in the list, it can return any.
         */
    if (arrayWord.length > 2) {
      first = arrayWord[randomNb]
    } else {
      first = this.words[Math.floor(Math.random() * Math.floor(Math.random() * this.words.length))]
    }

    return first
  }

  /**
     *
     * @param {*} id Player ID
     * @param {*} channel To save the text channel for the player to receive a message
     * @param {*} ctx Context
     * @returns
     */
  createHangmaid (id, channel, ctx) {
    const getGame = this.userGame
    const returns = this

    return this.userGame.set(id, {
      channel: channel,
      ctx: ctx,
      time: setTimeout(function () {
        if (typeof getGame.get(id) === 'undefined') {
        } else {
          returns.removeHangmaid(id, false)
        }
      }, 900000)
    })
  }

  /**
     *
     * @param {*} id Player ID
     * @param {*} message To mention that the player that the match has ended!
     */
  removeHangmaid (id, message) {
    clearTimeout(this.userGame.get(id))
    try { if (message === true) { this.userGame.get(id).ctx.send('O jogo foi finalizado!') } } catch (error) { }
    this.userGame.delete(id)
  }

  request (path, field, parameters = {}) {
    return axios({
      url: (process.env['POLLUX_' + field.toUpperCase()] + path),
      params: parameters,
      method: 'GET',
      headers: {
        'User-Agent': process.env.POLLUX_USER_AGENT
      },
      responseType: (path.includes('generator') ? 'arraybuffer' : 'json'),
      paramsSerializer: (params) => {
        let result = ''
        Object.keys(params).forEach(key => {
          result += `${key}=${encodeURIComponent(params[key])}&`
        })
        return result.substr(0, result.length - 1)
      }
    })
  }
}
