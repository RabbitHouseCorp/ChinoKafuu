const { Command, Button, ResponseAck, Emoji } = require('../../../utils')
const { CommandBase, CommandOptions, Choice } = require('eris')

module.exports = class PayCommand extends Command {
  constructor() {
    super({
      name: 'pay',
      aliases: ['pagar', 'doar'],
      arguments: 2,
      hasUsage: true,
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

    ctx.interaction()
      .components(new Button()
        .setLabel(ctx._locale('basic:boolean.true'))
        .customID('confirm_button')
        .setStyle(3),
        new Button()
          .setLabel(ctx._locale('basic:boolean.false'))
          .customID('reject_button')
          .setStyle(4))
      .returnCtx()
      .replyT('warn', 'commands:pay.confirm', { user: member.mention, yens: totalYens, total: value })
      .then(message => {
        const ack = new ResponseAck(message)
        ack.on('collect', ({ packet }) => {
          const data = packet
          if ((data.d.member.user.id !== message.mentions[0].id && message.member.id === ctx.client.user.id)) return
          switch (data.d.data.custom_id) {
            case 'confirm_button': {
              fromUser.yens -= totalYens
              toUser.yens += totalYens
              ctx.db.user.save()
              toUser.save().then(() => {
                ack.sendAck('update', {
                  content: `${Emoji.getEmoji('yen').mention} **|** ${ctx.message.member.mention}, ${ctx._locale('commands:pay.success', { yens: totalYens, user: member.mention })}`,
                  components: [
                    {
                      type: 1,
                      components: [
                        new Button()
                          .setLabel(ctx._locale('basic:boolean.true'))
                          .customID('confirm_button')
                          .setStyle(3)
                          .setStatus(true)
                          .data(),
                        new Button()
                          .setLabel(ctx._locale('basic:boolean.false'))
                          .customID('reject_button')
                          .setStyle(4)
                          .setStatus(true)
                          .data()
                      ]
                    }
                  ]
                })
              })
            }
              break
            case 'reject_button': {
              ack.sendAck('update', {
                content: `${Emoji.getEmoji('error').mention} **|** ${ctx.message.member.mention}, ${ctx._locale('commands:pay.cancelled')}`,
                components: [
                  {
                    type: 1,
                    components: [
                      new Button()
                        .setLabel(ctx._locale('basic:boolean.true'))
                        .customID('confirm_button')
                        .setStyle(3)
                        .setStatus(true)
                        .data(),
                      new Button()
                        .setLabel(ctx._locale('basic:boolean.false'))
                        .customID('reject_button')
                        .setStyle(4)
                        .setStatus(true)
                        .data()
                    ]
                  }
                ]
              })
            }
              break
          }
        })
      })
  }
}
