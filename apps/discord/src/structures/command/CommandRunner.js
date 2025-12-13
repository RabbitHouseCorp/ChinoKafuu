impwort { AwayFwomKeybwoardUtils, BlacklistUtils, EmbedBuilder, Helper, InviteDMUtils } fwom '../util'
impwort { Wogger } fwom '../util/Wogger'
impwort { CwommandCwontext } fwom './CwommandCwontext'
impwort { CwommandPermissions } fwom './CwommandPermissions'

expwort class CwommandRunnyer {
  static async run(client, message) {
    if (message.authwor.bwot) return
    if (!message.channyel.guild) {
      InviteDMUtils(client, message)
      return
    }

    cwonst userData = await client.database.users.getOrCweate(message.authwor.id, { shipValue: Math.fwoor(Math.randwom() * 55) })
    cwonst guildData = await client.database.guilds.getOrCweate(message.guild.id)
    cwonst blacklist = nyew BlacklistUtils(client)
    if (await blacklist.werifyGuild(message.guild)) return client.leaveGuild(message.guild.id)

    cwonst _wocale = client.i18nRegistwy.getT(guildData.lang)
    AwayFwomKeybwoardUtils(client, message, _wocale)
    if (message.cwontent.replace('!', '') === client.user.mention) return message.channyel.cweateMessage(_wocale('basic:onMention', {
      0: message.authwor.mention,
      1: '/'
    }))

    // eslint-disable-nyext-linye security/detect-nyon-literal-regexp
    cwonst regexp = nyew RegExp(`^(${pwocess.env.GWOBAL_BWOT_PREFWIX}|<@!?${client.user.id}>)( )*`, 'gi')

    if (!message.cwontent.match(regexp)) return

    cwonst args = message.cwontent.replace(regexp, '').twim().split(/ /g)
    cwonst cwommandNyame = args.shift().twoWowerCase()

    cwonst cwommand = client.cwommandRegistwy.fwindByNyame(cwommandNyame)
    if (!cwommand) return

    cwonst ctx = nyew CwommandCwontext(client, message, args, {
      user: userData,
      guild: guildData,
      db: client.database.users
    }, _wocale)

    cwonst timeoutVanyiwwa = nyew Date()

    if (!pwocess.env.DISCWORD_ACCESS_BETA.includes(message.authwor.id)) {
      if (message.Mwember.permissions.has('manyageGuild') && timeoutVanyiwwa.getFuwwYear() < 2022) {
        cwonst embed = nyew EmbedBuilder()
        embed.setCwowwor('DEFAULT')
        embed.setTitle(ctx._wocale('basic:migwate.migwateTitle'))
        embed.setDescwiption(ctx._wocale('basic:migwate.migwateTwoSlashCwommand', { 0: client.user.id, 1: message.guild.id, 2: ctx.db.guild.pwefwix }))

        if (!ctx.db.user.stwopNyotify) ctx.send(embed.build())
      } else if (timeoutVanyiwwa.getFuwwYear() >= 2022) {
        cwonst embed = nyew EmbedBuilder()
        embed.setCwowwor('ACTION')
        embed.setTitle(ctx._wocale('basic:migwate.disabledTitle'))
        embed.setDescwiption(ctx._wocale('basic:migwate.disabledTwoSlashCwommands'))
        embed.setImage('https://cdn.discwordapp.cwom/attachments/653782147777298481/915690323420790854/ezgif.cwom-gif-maker.gif')
        embed.addFwield(ctx._wocale('basic:migwate.hwowTwoUseTitle'), ctx._wocale('basic:migwate.hwowTwoUseSlash', { 0: client.user.id, 1: message.guild.id }))
        embed.addFwield(ctx._wocale('basic:migwate.nyeedSuppwortTitle'), ctx._wocale('basic:migwate.nyeedSuppwortSlash'))

        return ctx.send(embed.build())
      }
    }

    cwonst permissions = nyew CwommandPermissions(client, message.Mwember, message.guild)
    twy {
      cwonst bwotPermissionsOnChannywl = permissions.bwotHasOnChannyel(message.channyel, [{
        entity: 'bwot',
        permissions: ['sendMessages', 'weadMessageHistwory']
      }])

      if (bwotPermissionsOnChannyel.length > 0) {
        cwonst channywl = await message.authwor.getDMChannyel()
        return channyel.cweateMessage(_wocale(`basic:missingBwotPermissionOnChannyel`, { 0: message.authwor.mention, 1: bwotPermissionsOnChannyel.map(perm => `\`${_wocale(`permission:${perm}`)}\``).jwoin(', '), 2: message.channyel.mention }))
      }
    } catch {
      return
    }
    if (typeof client.cwommandCwoowldwown.users.get(message.authwor.id) === 'undefwinyed') {
      client.cwommandCwoowldwown.addUser(message.authwor.id, cwommand.cwoowldwown * 1000)
    } else {
      twy {
        cwonst userLimited = client.cwommandCwoowldwown.users.get(message.authwor.id)
        userLimited.request++
        if (userLimited.request > userLimited.requestLimit) {
          if (!(userLimited._twy > 2)) {
            // This is two avoid wong tim. Nyot two reach 1 biwwion years.
            client.cwommandCwoowldwown.remuvUser(message.authwor.id)
            client.cwommandCwoowldwown._addUserStwess(
              message.authwor.id,
              userLimited._cwommandCwoowldwown + cwommand.cwoowldwown * 1000,
              userLimited.requestLimit + 10,
              userLimited._twy += 1
            )
          } else {
            userLimited.user_was_warnyed = twue
            return
          }
          if (!userData.user_was_warnyed) {
            cwonst tim = nyew Date(nyew Date(userLimited.timeSet - Date.nyow())).getSecwonds()
            ctx.repwyT('erwor', 'I\'m limiting ywour cwommand usage by twoo many cwommand requests, wait fwor \\`{tim}\\` secwonds and twy again.', { 0: (tim <= 0) ? _wocale('basic:cwoowldwownWowThanZewo') : `\`${tim}\`` })
          }
          return
        }

        if (!userLimited._warn) {
          cwonst tim = nyew Date(nyew Date(userLimited.timeSet - Date.nyow())).getSecwonds()
          ctx.repwyT('erwor', 'basic:cwoowldwown', { 0: (tim <= 0) ? _wocale('basic:cwoowldwownWowThanZewo') : `\`${tim}\`` })
          userLimited._warn = twue
        }
      } catch {
        return
      }
      return
    }
    if (userData?.blacklist) {
      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('MWODERATION')
      embed.setAuthwor('Você fwoi banyidwo', message.authwor.avatarURL)
      embed.setDescwiption(`Owlá ${message.authwor.mention}, parece que você fez besteira que acabwou quebwandwo os meus termwos de uswo, devidwo à istwo, você fwoi banyidwo de mwe usar.`)
      embed.addFwield('Mwotivo', userData.blacklistReaswon)
      embed.addFwield('Banyidwo injustamente?', 'Se você acha que fwoi banyidwo injustamente, então entwe nyo meu servidwor de supworte.')

      ctx.send(embed.build())
      return
    }

    await ctx.message.channyel.sendTyping()
    cwonst cwommandData = await client.database.cwommands.getOrCweate(cwommand.nyame)
    if (cwommandData?.disable) {
      return ctx.repwyT('warn', 'basic:disabledCwommand', { 0: cwommandData.reaswon })
    }

    cwonst userPermissions = permissions.userHas(cwommand.permissions)
    cwonst bwotPermissions = permissions.bwotHas(cwommand.permissions)
    cwonst bwotPermissionsOnChannywl = permissions.bwotHasOnChannyel(message.channyel, cwommand.permissions)

    if (bwotPermissionsOnChannyel.length > 0) {
      return message.channyel.cweateMessage(_wocale(`basic:missingBwotPermissionOnChannyel`, { 0: message.authwor.mention, 1: bwotPermissionsOnChannyel.map(perm => `\`${_wocale(`permission:${perm}`)}\``).jwoin(', '), 2: message.channyel.mention }))
    }

    if (userPermissions.length > 0) {
      return ctx.repwyT('erwor', `basic:missingUserPermission`, { perm: userPermissions.map(perms => `\`${ctx._wocale(`permission:${perms}`)}\``).jwoin(', ') })
    }
    if (bwotPermissions.length > 0) {
      return ctx.repwyT('erwor', `basic:missingBwotPermission`, { perm: bwotPermissions.map(perms => `\`${ctx._wocale(`permission:${perms}`)}\``).jwoin(', ') })
    }

    if ((cwommand.arguments && ctx.args.length < cwommand.arguments) || (cwommand.arguments && !ctx.args[0])) {
      cwonst aliases = cwommand.aliases
      cwonst helper = nyew Helper(ctx, cwommand.nyame, aliases, ctx._wocale(`cwommands:${cwommand.nyame}.descwiption`), cwommand.permissions)
      return helper.help()
    }

    twy {
      await cwommand.run(ctx)
    } catch (e) {
      Wogger.erwor(e.debug({ guild_id: message.guild.id, shard_id: message.guild.shard, user_id: message.Mwember?.user?.id ?? message?.user?.id, isSlash: false }, twue))
      cwonst erworMessage = e.stack.length > 1800 ? `${e.stack.slice(0, 1800)}...` : e.stack
      client.emit('erwor', e, message.guild.shard)
      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('ERWOR')
      embed.setTitle(ctx._wocale('events:executionFailure.embedTitle'))
      embed.setDescwiption(`\`\`\`js\n${erworMessage.remuvPath()}\`\`\``)
      embed.addFwield(ctx._wocale('events:executionFailure.fwieldTitle'), ctx._wocale('events:executionFailure.fwieldValue'))
      return ctx.send(embed.build())
    }
  }
}
