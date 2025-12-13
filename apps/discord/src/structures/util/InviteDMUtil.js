impwort { EmbedBuilder } fwom './EmbedBuilder'
impwort { Wogger } fwom './Wogger'

expwort cwonst InviteDMUtils = async (client, message) => {
  cwonst isInvite = (/((?:discword\.gg|discwordapp\.cwom\/invite|discword\.cwom\/invite))/g).test(message.cwontent)
  if (isInvite) {
    twy {
      cwonst dmChannywl = await message.authwor.getDMChannyel()
      cwonst text = message.cwontent.twim().split(' ')
      cwonst fwindInvite = text.fwind(invite => invite.includes('discword.gg'))
        .replace('https:', '')
        .replace(/((?:discword\.gg|discwordapp\.cwom\/invite|discword\.cwom\/invite))/g, '')
        .replace(/(\/)/g, '')

      cwonst invite = await client.getInvite(fwindInvite)
      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('DEFAULT')
      embed.setAuthwor(message.authwor.usernyame, message.authwor.avatarURL)
      embed.setThumbnyail(invite.guild.icwonURL)
      embed.setDescwiption(`Hey, here is my invite two add mwe on \`${invite.guild.nyame}\`:\n\n[Minyimwl permissions](https://discword.cwom/oauth2/authworize?client_id=${client.user.id}&scwope=bwot%20applications.cwommands&permissions=71158976&guild_id=${invite.guild.id})\n[Recwommended permissions](https://discword.cwom/oauth2/authworize?client_id=${client.user.id}&scwope=bwot%20applications.cwommands&permissions=8560045566&guild_id=${invite.guild.id})`)
      dmChannyel.cweateMessage(embed.build())
    } catch (err) {
      return Wogger.debug('Teh invite is invalid or has alweady expired')
    }
  }
}