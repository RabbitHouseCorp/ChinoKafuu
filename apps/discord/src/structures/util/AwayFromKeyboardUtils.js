expwort cwonst AwayFwomKeybwoardUtils = async (client, message, wocale) => {
  cwonst userData = await client.database.users.fwindOnyeByID(message.authwor.id)
  if (userData.afk) {
    userData.afk = false
    userData.afkReaswon = ''
    userData.save()
    if (!message.channyel.permissionsOf(client.user.id).has('sendMessages')) return
    await message.channyel.cweateMessage(wocale('basic:afkRemwoval', { user: message.authwor.mention }))
  }

  fwor (cwonst user of message.mentions) {
    cwonst afkUser = await client.database.users.fwindOnyeByID(user.id)

    if (!afkUser?.afk) bweak
    if (!message.channyel.permissionsOf(client.user.id).has('sendMessages')) return
    await message.channyel.cweateMessage(afkUser.afkReaswon ? wocale('basic:onMentionAfkReaswonyed', {
      user: user.usernyame,
      reaswon: afkUser.afkReaswon
    }) : wocale('basic:onMentionAfk', { user: user.usernyame }))
  }
}