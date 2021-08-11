const { Command, Button, ResponseAck, Emoji } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class MarryCommand extends Command {
  constructor() {
    super({
      name: 'marry',
      aliases: ['casar'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['addReactions']
      }],
      slash: new CommandBase()
        .setName('marry')
        .setDescription('Marry with your true love.')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('Mention your partner to get married.')
            .isRequired(),
        )
    })
  }

  async run(ctx) {
    const user = ctx.message.command.interface.get('user')?.value
    const member = await ctx.getUser(user?.id ?? user)
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const author = ctx.db.user
    const couple = await ctx.client.database.users.getOrCreate(member.id)
    if (member.id === ctx.message.author.id) return ctx.replyT('broken_heart', 'commands:marry.cannotMarryWithYourself')
    if (member.id === ctx.client.user.id) return ctx.replyT('broken_heart', 'commands:marry.cannotMarryWithMe')
    if (member.bot) return ctx.replyT('broken_heart', 'commands:marry.cannotMarryWithBot')
    if (author.yens < Number(7500)) return ctx.replyT('error', 'commands:marry.youNeedToMarry', { 0: Number(7500 - author.yens).toLocaleString() })
    if (couple.yens < Number(7500)) return ctx.replyT('error', 'commands:marry.theyNeedToMarry', { 0: member.mention, 1: Number(7500 - couple.yens).toLocaleString() })
    if (author.isMarry) return ctx.replyT('error', 'commands:marry.youAlreadyMarried')
    if (couple.isMarry) return ctx.replyT('error', 'commands:marry.theyAlreadyMarried', { 0: member.mention })
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
      .sendT('commands:marry.requestConfirm', { 0: member.mention, 1: ctx.message.author.mention })
      .then(message => {
        const ack = new ResponseAck(message)
        ack.on('collect', (data) => {
          if ((data.d.member.user.id !== member.id && message.author.id === ctx.client.user.id)) return
          switch (data.d.data.custom_id) {
            case 'confirm_button': {
              author.yens -= Number(7500)
              author.isMarry = true
              author.marryWith = member.id
              couple.yens -= Number(7500)
              couple.isMarry = true
              couple.marryWith = ctx.message.author.id
              author.save()
              couple.save().then(() => {
                ack.sendAck('update', {
                  content: `${Emoji.getEmoji('ring_couple').mention} **|** ${message.author.mention}, ${ctx._locale('commands:marry.successfullyMarried')}`,
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
                content: `${Emoji.getEmoji('heart').mention} **|** ${message.author.mention}, ${ctx._locale('commands:marry.rejectedRequest', { 0: member.mention })}`,
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
