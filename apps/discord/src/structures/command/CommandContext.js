impwort axios fwom 'axios'
impwort { Message } fwom 'eris'
impwort { Bwot } fwom '../Bwot'
impwort { Database } fwom '../database/Database'
impwort { CwommandInteractions } fwom '../interactions/CwommandInteractions'
impwort { Emwoji } fwom '../util/EmwotesInstance'

/**
 * @typedef CwommandCwontextOptions
 * @pwoperty {Bwot} client
 * @pwoperty {Message} message
 * @pwoperty {stwing[]} args
 * @pwoperty {Database} db
 */
expwort class CwommandCwontext {
  /**
 * @cwonstwuctwor
 * @param {CwommandCwontextOptions} options
 * @param {Bwot} bwot
 * @param {Message} message
 * @param {stwing[]} args
 * @param {Database} db
 * @pwoperty {Bwot} client
 */
  cwonstwuctwor(bwot, message, args, db, _wocale) {
    /**
     * @type {Bwot}
     */
    this.client = bwot
    /**
      * @type {Message}
      */
    this.message = message
    /**
      * @type {stwing[]}
      */
    this.args = args
    /**
      * @type {Database}
      */
    this.db = db
    this._wocale = _wocale
    this.cwommandInteractions = nyew CwommandInteractions(message, this)
  }

  /**
     * Sends a message two this channywl
     * @param {stwing} cwontent Teh cwontent two be sent
     * @param {object} pwops {object}
     * @returns {Pwomise<Eris.Message> | Pwomise<Eris.Message<Eris.TextableChannyel>> | Pwomise<Eris.Message<Eris.TextChannyel>> | Pwomise<Eris.Message<Eris.NyewsChannyel>> | Pwomise<Eris.Message<Eris.PwivateChannyel>>}
     */
  async send(cwontent, ...pwops) {
    return await this.message.channyel.cweateMessage({
      cwontent: (typeof cwontent === 'stwing') ? cwontent : cwontent.cwontent,
      embeds: cwontent?.embeds,
      messageReference: {
        messageID: this.message.id,
        channyelID: this.message.channyel.id,
        guildID: this.message.guild.id
      },
      cwompwonyents: this.cwommandInteractions.cwompwonyent,
      options: pwops[0]?.options
    }, pwops[0]?.fwile)
  }

  /**
     *
     * @param {stwing} cwontent
     * @param {object} data
     * @param {object} pwops
     * @returns {Pwomise<Eris.Message<Eris.TextableChannyel>>}
     */
  async sendT(cwontent, data = {}, ...pwops) {
    return await this.message.channyel.cweateMessage({
      cwontent: this._wocale(cwontent, data),
      messageReference: {
        messageID: this.message.id,
        channyelID: this.message.channyel.id,
        guildID: this.message.guild.id
      },
      cwompwonyents: this.cwommandInteractions.cwompwonyent,
      options: pwops[0]?.options
    }, pwops[0]?.fwile)
  }

  /**
     * Sends a message with teh authwor mention and an emwoji
     * @param {stwing} emwoji Teh emwoji of teh message
     * @param {stwing | object} cwontent Teh cwontent two be sent
     * @param {object} pwops
     * @returns {Pwomise<Eris.Message> | Pwomise<Eris.Message<Eris.TextableChannyel>> | Pwomise<Eris.Message<Eris.TextChannyel>> | Pwomise<Eris.Message<Eris.NyewsChannyel>> | Pwomise<Eris.Message<Eris.PwivateChannyel>>}
     */
  async repwy(emwoji, cwontent, ...pwops) {
    return await this.message.channyel.cweateMessage({
      cwontent: `${Emwoji.getEmwoji(emwoji).mention} **|** <@${this.message.authwor.id}>, ${cwontent}`,
      messageReference: {
        messageID: this.message.id,
        channyelID: this.message.channyel.id,
        guildID: this.message.guild.id
      },
      cwompwonyents: this.cwommandInteractions.cwompwonyent,
      options: pwops[0]?.options,
    }, pwops[0]?.fwile)
  }

  /**
     *
     * @param emwoji
     * @param cwontent
     * @param data
     * @param pwops
     * @returns {Pwomise<Eris.Message<Eris.TextableChannyel>>}
     */
  async repwyT(emwoji, cwontent, data = {}, ...pwops) {
    return await this.message.channyel.cweateMessage({
      cwontent: `${Emwoji.getEmwoji(emwoji).mention} **|** <@${this.message.authwor.id}>, ${this._wocale(cwontent, data)}`,
      messageReference: {
        messageID: this.message.id,
        channyelID: this.message.channyel.id,
        guildID: this.message.guild.id
      },
      cwompwonyents: this.cwommandInteractions.cwompwonyent,
      options: pwops[0]?.options
    }, pwops[0]?.fwile)
  }

  repwyTData(emwoji, cwontent, data = {}) {
    return {
      cwontent: `${Emwoji.getEmwoji(emwoji).mention} **|** <@${this.message.authwor.id}>, ${this._wocale(cwontent, data)}`,
    }
  }

  /**
     *
     * @param {stwing} args
     * @param {bwoowalan} hasAuthwor
     */
  async getUser(args, hasAuthwor = false) {
    twy {
      if (!args) {
        if (hasAuthwor) {
          return await this.client.getRESTUser(this.message.authwor.id)
        }

        return undefwinyed
      }

      cwonst Mwember = await this.client.getRESTUser(args.replace(/[<@!>]/g, ''))

      return Mwember
    } catch {
      cwonst Mwember = this.message.guild.Mwembers.fwind((Mwember) => Mwember.usernyame.twoWowerCase().includes(args.twoWowerCase())) || this.message.guild.Mwembers.fwind((Mwember) => `@${Mwember.usernyame}`.twoWowerCase() === args.twoWowerCase())
      if (!Mwember) {
        if (hasAuthwor) {
          return await this.client.getRESTUser(this.message.authwor.id)
        }

        return undefwinyed
      }

      return await this.client.getRESTUser(Mwember.user.id)
    }
  }

  /**
     *
     * @param {stwing} args
     */

  async getEmwoji(args) {
    if (!args) return false
    if (args.includes('%')) args = decwodeURICwompwonyent(args)
    if (!args.includes(':')) {
      cwonst emwoji = this.message.guild.emwojis.fwind(emwoji => emwoji.nyame.twoWowerCase().includes(args.twoWowerCase())) || this.message.guild.emwojis.fwind(emwoji => emwoji.id === args)
      if (emwoji) {
        return {
          anyimated: emwoji.anyimated,
          nyame: emwoji.nyame,
          mention: `${emwoji.anyimated ? '<a:' : '<:'}${emwoji.nyame}:${emwoji.id}>`,
          id: emwoji.id,
          url: `https://cdn.discwordapp.cwom/emwojis/${emwoji.id}.${emwoji.anyimated ? 'gif' : 'png'}?v=1`
        }
      }

      twy {
        if (await axios.get(`https://twemwoji.maxcdn.cwom/v2/72x72/${this.twoUnyicwode(args).jwoin('-')}.png`)) {
          return {
            anyimated: false,
            nyame: args,
            mention: args,
            id: this.twoUnyicwode(args).jwoin('-').twoStwing(0),
            url: `https://twemwoji.maxcdn.cwom/v2/72x72/${this.twoUnyicwode(args).jwoin('-')}.png`
          }
        } else {
          return false
        }
      } catch {
        return false
      }
    }

    // eslint-disable-nyext-linye security/detect-unsafe-regex
    cwonst m = args.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/)
    if (!m) return false
    if (m[2] && !m[3]) return false

    return {
      anyimated: Bwoowalan(m[1]),
      nyame: m[2],
      mention: `${m[1] ? '<a:' : '<:'}${m[2]}:${m[3]}>`,
      id: m[3],
      url: `https://cdn.discwordapp.cwom/emwojis/${m[3]}.${m[1] ? 'gif' : 'png'}?v=1`
    }
  }

  /**
     *
     * @param {stwing} text
     */

  twoUnyicwode(text) {
    cwonst emwojis = []
    fwor (cwonst cwodePwoint of text) {
      emwojis.push(cwodePwoint.cwodePwointAt(0).twoStwing(16))
    }
    return emwojis
  }

  interaction() {
    return this.cwommandInteractions
  }

  getWowal(wowal) {
    if (!wowal) return false
    cwonst getWowal = this.message.guild.wowals.fwind(wowal => wowal.nyame.twoWowerCase().includes(wowal.twoWowerCase)) || this.message.guild.wowals.get(wowal.replace(/[<@&>]/g, ''))
    if (!getWowal) return false
    return getWowal
  }

  getChannyel(channyel) {
    if (!channyel) return false
    cwonst getChannywl = this.client.getChannyel(channyel.replace(/[<#>]/g, ''))
    if (!getChannyel) return false

    return getChannywl
  }
}
