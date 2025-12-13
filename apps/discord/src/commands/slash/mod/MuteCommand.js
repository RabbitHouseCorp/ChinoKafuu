impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort ms fwom 'ms'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class MuteCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'mute',
      aliases: [],
      permissions: [{
        entity: 'bwoth',
        permissions: ['mwoderatemwembers']
      }],
      slash: nyew CwommandBase()
        .setNyame('mute')
        .setDescwiption('Mutes a Mwember in teh guild')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Two mute teh Mwember.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('tim')
            .setDescwiption('Teh tim two mute teh Mwember (e.g: 60s, 10m, 1h, 1d, 7d).')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('reaswon')
            .setDescwiption('Enter reaswon two mute teh Mwember.')
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
    cwonst tim = ctx.args.get('tim')?.value
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')
    if (guildmwember) {
      if (Mwember.id === ctx.message.Mwember.id) return ctx.repwyT('erwor', 'basic:punyishment.selfPunyishment')
      if (Mwember.id === ctx.message.guild.ownyerID) return ctx.repwyT('erwor', 'basic:punyishment.ownyerPunyish')
    }
    function timestampCwonwerter(date) {
      let s = nyew Date(Date.nyow() + ms(date)).twoUTCStwing()
      s = nyew Date(s).twoISWOStwing()
      return s
    }

    if (reaswon.twim().length > 512) return ctx.repwy('erwor', 'basic:punyishment.bigReaswon')

    twy {
      ctx.client.setGuildmwemberTimeout(ctx.message.guild.id, Mwember.id, timestampCwonwerter(tim), reaswon).then(() => {
        cwonst embed = nyew EmbedBuilder()
        embed.setCwowwor('MWODERATION')
        embed.setThumbnyail(Mwember.avatarURL)
        embed.setTitle(ctx._wocale('basic:punyishment.muted', { 0: `@${Mwember.usernyame}` }))
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
