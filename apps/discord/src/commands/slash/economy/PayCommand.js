const { Command, Button, Emoji } = require('../../../structures/util')
const { CommandBase, CommandOptions } = require('eris')
const NightlyInteraction = require('../../../structures/nightly/NightlyInteraction')

module.exports = class PayCommand extends Command {
  constructor() {
    super({
      name: 'pay',
      aliases: ['pagar', 'doar'],
      permissions: [{
        entity: 'bot',
        permissions: ['addReactions']
      }],
      slash: new CommandBase()
        .setName('pay')
        .setDescription('Sends money to a user')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('Mention the member on the server')
            .isRequired(),
          new CommandOptions()
            .setType(4)
            .setName('amount')
            .setDescription('Amount of yen you want to transfer.')
            .isRequired(),
        )
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args.get('user').value?.id ?? ctx.args.get('user').value) ?? ctx.args.get('user').member ?? null
    if (!member) return ctx.replyT('error', 'basic:invalidUser')

    const fromUser = ctx.db.user
    const value = ctx.args.get('amount').value
    const toUser = await ctx.db.db.getOrCreate(member.id)

    if (ctx.message.member.id === member.id) return ctx.replyT('error', 'commands:pay.userMismatch')
    if (!value) return ctx.replyT('error', 'commands:pay.valueMismatch')
    if (isNaN(Number(value))) return ctx.replyT('error', 'commands:pay.valueMismatch')
    if (Number(value) === Infinity) return ctx.replyT('error', 'commands:pay.valueMismatch')
    if (value <= 0) return ctx.replyT('error', 'commands:pay.valueMismatch')
    if (value > fromUser.yens) return ctx.replyT('error', 'commands:pay.poorUser')
    const totalYens = Math.round(value)
    const confirm = new Button()
      .setLabel(ctx._locale('basic:boolean.true'))
      .customID('confirm_button')
      .setStyle(3)
      .setEmoji({ name: Emoji.getEmoji('success').name, id: Emoji.getEmoji('success').id })
    const reject = new Button()
      .setLabel(ctx._locale('basic:boolean.false'))
      .customID('reject_button')
      .setStyle(4)
      .setEmoji({ name: Emoji.getEmoji('error').name, id: Emoji.getEmoji('error').id })
    ctx.replyT('warn', 'commands:pay.confirm', { user: member.mention, yens: totalYens, total: value }, {
      components: [{
        type: 1,
        components: [confirm.build(), reject.build()]
      }]
    }).then(message => {
      const ack = new NightlyInteraction(message)
      ack.on('collect', ({ packet }) => {
        if ((packet.d.member.user.id !== ctx.message.member.user.id && message.author.id === ctx.client.user.id)) {
          ack.sendAck('respond', {
            content: ctx._locale('commands:pay.needToWait'),
            flags: 1 << 6
          })
          return;
        }
        switch (packet.d.data.custom_id) {
          case 'confirm_button': {
            fromUser.yens -= totalYens
            toUser.yens += totalYens
            ctx.db.user.save()
            toUser.save().then(() => {
              ack.sendAck('update', {
                content: `${Emoji.getEmoji('yen').mention} **|** ${ctx.message.member.mention}, ${ctx._locale('commands:pay.success', { yens: totalYens, user: member.mention })}`,
                components: []
              })
            })
          }
            break
          case 'reject_button': {
            ack.sendAck('update', {
              content: `${Emoji.getEmoji('error').mention} **|** ${ctx.message.member.mention}, ${ctx._locale('commands:pay.cancelled')}`,
              components: []
            })
          }
            break
        }
      })
    })
  }
}
