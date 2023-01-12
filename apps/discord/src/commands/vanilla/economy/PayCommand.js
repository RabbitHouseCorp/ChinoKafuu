import { NightlyInteraction } from '../../../structures/nightly/NightlyInteraction'
import { Button, Command, Emoji } from '../../../structures/util'

export default class PayCommand extends Command {
  constructor() {
    super({
      name: 'pay',
      aliases: ['pagar', 'doar'],
      permissions: [{
        entity: 'bot',
        permissions: ['addReactions']
      }]
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')

    const fromUser = ctx.db.user
    const value = ctx.args[1]
    const toUser = await ctx.db.db.getOrCreate(member.id)

    if (ctx.message.author.id === member.id) return ctx.replyT('error', 'commands:pay.userMismatch')
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
        const ack = new NightlyInteraction(message)
        ack.on('collect', ({ packet }) => {
          if ((packet.d.member.user.id !== ctx.message.author.id && message.member.id === ctx.client.user.id)) {
            ack.sendAck('respond', {
              content: `You need to wait for the person paying you to accept the transaction request.`,
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
                  content: `${Emoji.getEmoji('yen').mention} **|** ${message.author.mention}, ${ctx._locale('commands:pay.success', { yens: totalYens, user: member.mention })}`,
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
                content: `${Emoji.getEmoji('error').mention} **|** ${message.author.mention}, ${ctx._locale('commands:pay.cancelled')}`,
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
