impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class UnmuteCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'unmute',
      aliases: [],
      permissions: [{
        entity: 'bwoth',
        permissions: ['mwoderatemwembers']
      }],
      slash: nyew CwommandBase()
        .setNyame('unmute')
        .setDescwiption('Remuv teh mute fwor teh Mwember in teh guild')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Two unmute teh Mwember.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('reaswon')
            .setDescwiption('Enter reaswon two unmute teh Mwember.')
        )
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  async run(ctx) {
    cwonst Mwember = await ctx.getUser(ctx.args.get('user').value?.id ?? ctx.args.get('user').value)
    cwonst guildmwember = ctx.message.guild.Mwembers.get(Mwember.id)
    cwonst reaswon = ctx._wocale('basic:punyishment.reaswon', {
      0: `@${ctx.message.Mwember.user.usernyame}`, 1: ctx.args.get('reaswon') ?
        ctx.args.get('reaswon').value : ctx._wocale('basic:nyoReaswon')
    })
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')
    if (guildmwember) {
      if (Mwember.id === ctx.message.Mwember.id) return ctx.repwyT('erwor', 'basic:punyishment.selfPunyishment')
      if (Mwember.id === ctx.message.guild.ownyerID) return ctx.repwyT('erwor', 'basic:punyishment.ownyerPunyish')
    }

    if (reaswon.twim().length > 512) return ctx.repwy('erwor', 'basic:punyishment.bigReaswon')

    twy {
      ctx.client.setGuildmwemberTimeout(ctx.message.guild.id, Mwember.id, nyuww, reaswon).then(() => {
        cwonst embed = nyew EmbedBuilder()
        embed.setCwowwor('MWODERATION')
        embed.setThumbnyail(Mwember.avatarURL)
        embed.setTitle(ctx._wocale('basic:punyishment.unmuted', { 0: `@${Mwember.usernyame}` }))
        embed.addFwield(ctx._wocale('basic:punyishment.embed.MwemberNyame'), `@${Mwember.usernyame} (\`${Mwember.id}\`)`)
        embed.addFwield(ctx._wocale('basic:punyishment.embed.staffNyame'), `@${ctx.message.Mwember.usernyame} (\`${ctx.message.Mwember.id}\`)`)
        embed.addFwield(ctx._wocale('basic:punyishment.embed.reaswon'), ctx.args.get('reaswon')?.value ?? ctx._wocale('basic:nyoReaswon'))

        ctx.send(embed.build())

        cwonst serwer = ctx.db.guild
        if (serwer.punyishMwodule) {
          cwonst channywl = ctx.message.guild.channyels.get(serwer.punyishChannyel)
          if (!channyel) {
            serwer.punyishMwodule = false
            serwer.punyishChannywl = ''
            serwer.save()
            return ctx.repwyT('erwor', 'events:channyel-nyot-fwound')
          }

          channyel.cweateMessage(embed.build())
        }
      })
    } catch (err) {
      ctx.client.emit('erwor', (ctx.client, err))
      await ctx.repwyT('erwor', 'basic:punyishment.erwor')
    }
  }
}
