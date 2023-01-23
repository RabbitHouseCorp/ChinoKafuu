import { Command } from '../../../structures/util'

export default class JanKenPonCommand extends Command {
  constructor() {
    super({
      name: 'jankenpon',
      aliases: ['ppt', 'pedrapapeltesoura', 'rps', 'janken'],
    })
  }

  async run(ctx) {
    const user = await ctx.db.user
    const client = await ctx.client.database.users.getOrCreate(ctx.client.user.id)
    const options = ['pedra', 'papel', 'tesoura']
    if (!['pedra', 'papel', 'tesoura', 'rock', 'paper', 'scissors'].includes(ctx.args[0])) return ctx.replyT('error', 'commands:jankenpon.optionNotFound')
    const clientChoice = options[Math.floor(Math.random() * options.length)]
    const me = ctx.args[0].toLowerCase()
    let result
    let emoji
    const value = ctx.args[1]
    if (!value) return ctx.replyT('warn', 'commands:jankenpon.valueNotInputed')
    const invalidValue = Number(value) < 0 || Number(value) === Infinity || isNaN(value)
    if (invalidValue) return ctx.replyT('error', 'commands:pay.invalidValue')
    if (user.yens < value) return ctx.replyT('error', 'commands:pay.poorUser')
    const clientChoiceMappings = {
      tesoura: ['pedra', 'rock'],
      papel: ['tesoura', 'scissors'],
      pedra: ['papel', 'paper']
    }

    const clientDrawMappings = {
      tesoura: 'scissors',
      pedra: 'rock',
      papel: 'paper',
      scissors: 'scissors',
      rock: 'rock',
      paper: 'paper'
    }

    const userWinOption = (clientChoiceMappings[typeof clientChoice === 'string' ? clientChoice : null])
      .includes(clientDrawMappings[typeof me === 'string' ? me : null])
    if (userWinOption) {
      emoji = 'chino_upset'
      result = ctx._locale('commands:jankenpon.youWin', { 0: ctx._locale(`commands:jankenpon.choice.${clientDrawMappings[typeof me === 'string' ? me : null]}`), 1: ctx._locale(`commands:jankenpon.choice.${clientDrawMappings[typeof clientChoice === 'string' ? clientChoice : null]}`), 2: Number(value).toLocaleString() })
      user.yens += Math.floor(value)
      user.save()
      if (Number(value) <= client.yens) {
        client.yens -= Math.floor(value)
        client.save()
      }
    } else if (clientDrawMappings[typeof clientChoice === 'string' ? clientChoice : null] === clientDrawMappings[typeof me === 'string' ? me : null]) {
      emoji = 'chino_whoa'
      result = ctx._locale('commands:jankenpon.tie')
    } else if (!userWinOption) {
      emoji = 'chino_kek'
      result = ctx._locale('commands:jankenpon.youLose', { 0: ctx._locale(`commands:jankenpon.choice.${clientDrawMappings[typeof me === 'string' ? me : null]}`), 1: ctx._locale(`commands:jankenpon.choice.${clientDrawMappings[typeof clientChoice === 'string' ? clientChoice : null]}`), 2: Number(value).toLocaleString() })
      user.yens -= Math.floor(value)
      client.yens += Math.floor(value)
      user.save()
      client.save()
    }

    ctx.send('Jan ken pon').then(msg => {
      setTimeout(() => {
        msg.delete()
        ctx.reply(emoji, result)
      }, 2000)
    })
  }
}
