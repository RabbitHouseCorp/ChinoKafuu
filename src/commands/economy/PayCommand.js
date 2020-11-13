const Command = require('../../structures/command/Command')
const { ReactionCollector } = require('../../utils')

class PayCommand extends Command {
  constructor() {
    super({
      name: 'pay',
      aliases: ['pagar', 'doar'],
      arguments: 2,
      permissions: [{
        entity: 'bot',
        permissions: ['addReactions']
      }]
    })
  }

  //TODO This command will have buttons in the new API version
  async run(ctx) {
    const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')

    const fromUser = ctx.db.user
    const value = ctx.args[1]
    const toUser = await ctx.db.db.getOrCreate(member.id)

    if (!ctx.message.mentions[0]) return
    if (ctx.message.author.id === member.id) return ctx.replyT('error', 'commands:pay.userMismatch')
    if (!value) return ctx.replyT('error', 'commands:pay.valueMismatch')
    if (isNaN(Number(value))) return ctx.replyT('error', 'commands:pay.valueMismatch')
    if (Number(value) === Infinity) return ctx.replyT('error', 'commands:pay.valueMismatch')
    if (value <= 0) return ctx.replyT('error', 'commands:pay.valueMismatch')
    if (value > fromUser.yens) return ctx.replyT('error', 'commands:pay.poorUser')

    const realValue = this.getTax(value, 2)
    const totalYens = Math.round(realValue[0])
    const message = await ctx.replyT('warn', 'commands:pay.confirm', { user: member.mention, yens: totalYens, fee: realValue[1], total: value }) //TODO add warn emoji

    await message.addReaction('✅')
    await message.addReaction('error:577973245391667200')

    const filter = (_, emoji, userID) => (["✅", "error"].includes(emoji.name)) && userID === ctx.message.author.id
    const collector = new ReactionCollector(message, filter, { max: 1 })
    collector.on('collect', async (_, emoji) => {
      if (emoji.name === '✅') {
        fromUser.yens -= totalYens
        toUser.yens += totalYens
        await message.delete()
        await ctx.replyT('yen', 'commands:pay.success', { yens: totalYens, user: member.mention })
        ctx.db.user.save()
        toUser.save()
      }

      if (emoji.name === 'error') {
        await ctx.replyT('error', 'commands:pay.cancelled')
        return message.delete()
      }
    })
  }

  getTax(val, percent) {
    percent = parseFloat(val * (2 / 100))
    if (percent > 25) percent = 25
    return [val - ((val / 100) * percent), percent]
  }
}

module.exports = PayCommand
