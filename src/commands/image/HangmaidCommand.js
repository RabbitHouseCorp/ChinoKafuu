// FUTURE[epic=KafuuTeam] Overlap

const { Command, MessageCollector, Emoji } = require('../../utils')
const moment = require('moment')
require('moment-duration-format')
module.exports = class HangmaidCommand extends Command {
  constructor () {
    super({
      name: 'hangmaid',
      hasUsage: true,
      arguments: 1,
      permissions: [{
        permissions: ['attachFiles']
      }]
    })

    this.color = false
  }

  async run (ctx) {
    this.color = typeof ctx.client.polluxClient.data.letterColor === 'boolean' ? ctx.client.polluxClient.data.letterColor : false
    const _locale = ctx._locale
    let countError = 0
    let letterCorrect = 0
    let letterCorrectUser = 0 /** Do not ask me  */
    const removeLetter = 0
    const time = Date.now()
    const member = ctx.message.author
    let mode = '0'
    if (typeof ctx.args[0] === 'string') {
      mode = ctx.args[0]
    }

    const a = []
    const textRandom = await ctx.client.polluxClient.randomWord(mode === '1' ? Math.floor(Math.random() * 5) : '5')
    const Theme = `${textRandom.theme}`.toLocaleUpperCase()

    const ChosenLetter = `${textRandom.word}`.toLocaleUpperCase()
      .replace(/( +)/g, '{')
      .split('')

    const letters = []
    let nb = -1

    for (const letter of ChosenLetter) {
      nb++
      letters.push({
        nb: nb,
        letter: letter,
        correct: false,
        isSpace: letter !== '{',
        show: false
      })
    }

    const randomNb = [1, 2]

    switch (mode) {
      case '1':
        Array.from({ length: randomNb[Math.floor(Math.random() * randomNb.length)] }, () => {
          letters[Math.floor(Math.random() * letters.length)].show = true
          letters[Math.floor(Math.random() * letters.length)].correct = true
          letterCorrect++
        })
        break
      case '2':
        Array.from({ length: 1 }, () => {
          letters[Math.floor(Math.random() * letters.length)].show = true
          letters[Math.floor(Math.random() * letters.length)].correct = true
          letterCorrect++
        })
        break
      default:
        return ctx.replyT('chino_think', _locale('commands:hangmaid.mode'))
    }

    if (typeof ctx.client.polluxClient.userGame.get(member.id) === 'undefined') {
      ctx.client.polluxClient.createHangmaid(member.id, ctx.channel, ctx)
    } else {
      return ctx.replyT(_locale('commands:hangmaid.cannot'))
    }

    const checkLetter = (letter) => {
      let success = 0
      let wrong = 0

      for (const infLetter of letters) {
        switch (letter) {
          case '{':
            /** SPACE IGNORE */
            break
          default:
            if (letters[infLetter.nb].correct === true) {
              /** IGNORE THIS LETTER */
            } else {
              if (letter === infLetter.letter) {
                if (letterCorrectUser === 0) {
                  letterCorrect++
                  letterCorrectUser = 1
                } else {
                  letterCorrect++
                  letterCorrectUser++
                }

                success++
                letters[infLetter.nb].correct = true

                return
              } else {
                if (infLetter.show === true) {

                } else {
                  wrong++
                }
              }
            }
        }
      }

      if (wrong === 0) {
        letterCorrectUser++
        success++
      } else {
        countError++
        if (typeof ChosenLetter.find(y => y === letter) === 'undefined') {
          if (letter.length === 0) {

          } else {
            if (typeof a.find(u => u === letter.split('')[0]) === 'undefined') {
              a.push(letter.split('')[0])
            } else {

            }
          }
        } else {

        }
      }
    }

    const correctMap = (showBoolean) => {
      return letters.map((letter) => {
        if (letter.letter === '{') {
          return ' '
        }
        if (letter.correct === true) {
          return letter.letter
        } else {
          return '_'
        }
      }).join('')
    }

    const g = correctMap()

    ctx.client.polluxClient.request('/generators/hangmaid', 'generator', { a: a.join(''), g: g, h: Theme })
      .then(buffer => {
        ctx.send('', {
          embed: {
            color: 0xff3b6f,
            title: '✍️| Hangmaid',
            description: `\n${_locale('commands:hangmaid.stats_1', {
                            0: this.convertNumberForEmote(a.length, '_err', this.color),
                            1: this.convertNumberForEmote(letterCorrectUser, '_default', this.color),
                            2: this.convertNumberForEmote(mode, '_default', this.color),
                            3: this.convertNumberForEmote(ChosenLetter.length - letterCorrect, '_default', this.color),
                            4: `${moment.duration(Date.now() - time).format(_locale('commands:hangmaid.time'))}`
                        })}`.replace('{emote_wrong}', Emoji.getEmoji('wrong').reaction).replace('{emote_correct}', Emoji.getEmoji('correct').reaction),
            image: { url: 'attachment://hangmaid.png' }
          }
        }, {
          file: buffer.data,
          name: 'hangmaid.png'
        }).then(msg => {
          const collect = new MessageCollector(msg.channel, (message) => {
            if (member.id === message.member.id) {

            } else {
              return
            }

            if (typeof ctx.client.polluxClient.userGame.get(member.id) === 'undefined') {
              collect.ended = true
              collect.emit('end', null, true)
            } else {
              checkLetter(message.content.toLocaleUpperCase())
              if (a.length > 5 /**  RIP  */) {
                try {
                  ctx.client.polluxClient.request('/generators/hangmaid', 'generator', { a: a.join(''), g: correctMap(), h: Theme })
                    .then(buffer => {
                      ctx.client.polluxClient.removeHangmaid(member.id, true)

                      ctx.send('', {
                        embed: {
                          color: 0xff3b6f,
                          title: `✍️| ${_locale('commands:hangmaid.resultloser')}`,
                          description: `${_locale('commands:hangmaid.loser')}\n\n${_locale('commands:hangmaid.stats_2', {
                                                            0: this.convertNumberForEmote(a.length, '_err', this.color),
                                                            1: this.convertNumberForEmote(letterCorrectUser, '_default', this.color),
                                                            2: this.convertNumberForEmote(mode, '_default', this.color),
                                                            3: this.convertNumberForEmote(ChosenLetter.length - letterCorrect, '_default', this.color),
                                                            4: `${moment.duration(Date.now() - time).format(_locale('commands:hangmaid.time'))}`
                                                        })}`.replace('{emote_wrong}', Emoji.getEmoji('wrong').reaction).replace('{emote_correct}', Emoji.getEmoji('correct').reaction),

                          image: { url: 'attachment://hangmaid.png' }

                        }
                      }, {
                        file: buffer.data,
                        name: 'hangmaid.png'
                      })
                    })
                  collect.ended = true
                  collect.emit('end', null, true)
                } catch { }
                return
              }

              if (letterCorrect > ChosenLetter.length - 1) {
                try {
                  ctx.client.polluxClient.removeHangmaid(member.id, false)
                  ctx.client.polluxClient.request('/generators/hangmaid', 'generator', { a: a.join(''), g: correctMap(), h: Theme })
                    .then(buffer => {
                      ctx.send('', {
                        embed: {
                          color: 0xff3b6f,
                          title: `🎉| ${_locale('commands:hangmaid.winner')}`,
                          description: `${_locale('commands:hangmaid.stats_2', {
                                                            0: this.convertNumberForEmote(a.length, '_err', this.color),
                                                            1: this.convertNumberForEmote(letterCorrectUser, '_default', this.color),
                                                            2: this.convertNumberForEmote(mode, '_default', this.color),
                                                            3: this.convertNumberForEmote(ChosenLetter.length - letterCorrect, '_default', this.color),
                                                            4: `${moment.duration(Date.now() - time).format(_locale('commands:hangmaid.time'))}`
                                                        })}`.replace('{emote_wrong}', Emoji.getEmoji('wrong').reaction).replace('{emote_correct}', Emoji.getEmoji('correct').reaction),

                          image: { url: 'attachment://hangmaid.png' }

                        }
                      }, {
                        file: buffer.data,
                        name: 'hangmaid.png'
                      })
                    })
                  collect.ended = true
                  collect.emit('end', null, true)
                } catch (ignore) {

                }
                return
              }
              ctx.client.polluxClient.request('/generators/hangmaid', 'generator', { a: a.join(''), g: correctMap(), h: Theme })
                .then(buffer => {
                  const idGenerator = Math.floor(Math.random() * 12000000000)

                  ctx.send('', {
                    embed: {
                      color: 0xff3b6f,
                      title: '✍️| Hangmaid',
                      description: `\n${_locale('commands:hangmaid.stats_1', {
                                                0: this.convertNumberForEmote(a.length, '_err', this.color),
                                                1: this.convertNumberForEmote(letterCorrectUser, '_default', this.color),
                                                2: this.convertNumberForEmote(mode, '_default', this.color),
                                                3: this.convertNumberForEmote(ChosenLetter.length - letterCorrect, '_default', this.color),
                                                4: `${moment.duration(Date.now() - time).format(_locale('commands:hangmaid.time'))}`
                                            })}`.replace('{emote_wrong}', Emoji.getEmoji('wrong').reaction).replace('{emote_correct}', Emoji.getEmoji('correct').reaction),
                      image: { url: 'attachment://hangmaid.png' }
                    }
                  }, {
                    file: buffer.data,
                    name: 'hangmaid.png'
                  })
                })
            }
          })
        })
      })
  }

  convertNumberForEmote (nb, emotePath, yes) {
    const arrayNb = `${nb}`.split('')
    const arrayLetters = []
    for (const numberStr of arrayNb) {
      switch (numberStr) {
        case '0':
          if (this.color === true) {
            arrayLetters.push(Emoji.getEmoji('0' + emotePath).mention)
          } else {
            arrayLetters.push('0')
          }
          break
        case '1':
          if (this.color === true) {
            arrayLetters.push(Emoji.getEmoji('1' + emotePath).mention)
          } else {
            arrayLetters.push('1')
          }
          break
        case '2':
          if (this.color === true) {
            arrayLetters.push(Emoji.getEmoji('2' + emotePath).mention)
          } else {
            arrayLetters.push('2')
          }
          break
        case '3':
          if (this.color === true) {
            arrayLetters.push(Emoji.getEmoji('3' + emotePath).mention)
          } else {
            arrayLetters.push('3')
          }
          break
        case '4':
          if (this.color === true) {
            arrayLetters.push(Emoji.getEmoji('4' + emotePath).mention)
          } else {
            arrayLetters.push('4')
          }
          break
        case '5':
          if (this.color === true) {
            arrayLetters.push(Emoji.getEmoji('5' + emotePath).mention)
          } else {
            arrayLetters.push('5')
          }
          break
        case '6':
          if (this.color === true) {
            arrayLetters.push(Emoji.getEmoji('6' + emotePath).mention)
          } else {
            arrayLetters.push('6')
          }
          break
        case '7':
          if (this.color === true) {
            arrayLetters.push(Emoji.getEmoji('7' + emotePath).mention)
          } else {
            arrayLetters.push('7')
          }
          break
        case '8':
          if (this.color === true) {
            arrayLetters.push(Emoji.getEmoji('8' + emotePath).mention)
          } else {
            arrayLetters.push('8')
          }
          break
        case '9':
          if (this.color === true) {
            arrayLetters.push(Emoji.getEmoji('9' + emotePath).mention)
          } else {
            arrayLetters.push('9')
          }
          break
        default:
                /** No */
      }
    }
    return yes === true ? arrayLetters.join('') : `**${arrayLetters.join('')}**`
  }
}
