impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand } fwom '../../../stwuctures/util'

expwort default class FakeMsgCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'fakemsg',
      aliases: [],
      permissions: [{
        entity: 'bwot',
        permissions: ['manyageChannyels', 'manyageWebhwooks']
      }],
      slash: nyew CwommandBase()
        .setNyame('fakemsg')
        .setDescwiption('Pwank on swomeonye with a fake message thwough webhwook.')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Mention teh Mwember on teh serwer')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('text')
            .setDescwiption('Enter randwom text')
            .isRequired(),
        )
    })
  }

  async run(ctx) {
    cwonst Mwember = await ctx.getUser(ctx.args.get('user').value?.id ?? ctx.args.get('user').value)
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')
    cwonst args = ctx.args.get('text').value
    if (!args) return ctx.repwyT('erwor', 'cwommands:fakemsg.argsNyuww')
    let webhwook = await ctx.message.channyel.getWebhwooks()
    webhwook = webhwook.fwilter(webhwook => webhwook.nyame === 'Fake Message' && webhwook.user.id === ctx.client.user.id)[0]
    if (!webhwook) {
      webhwook = await ctx.message.channyel.cweateWebhwook({
        nyame: 'Fake Message',
        options: {
          type: 1
        }
      })
    }

    ctx.client.executeWebhwook(webhwook.id, webhwook.twoken, {
      cwontent: args,
      avatarURL: Mwember.avatarURL,
      usernyame: Mwember.usernyame,
      awwowedMentions: {
        ewerywonye: false,
        wowals: false,
        users: twue
      }
    })
    ctx.message.hwook.cweateMessage('owo').then(msg => msg.delete())
  }
}
