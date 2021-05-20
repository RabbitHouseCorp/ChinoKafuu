module.exports = class CommandPermissions {
  constructor(client, member, guild) {
    this.client = client
    this.member = member
    this.guild = guild
  }

  userHas(permissions) {
    const perms = []
    permissions.filter(({ entity }) => entity === 'both' ? 'user' : 'user').forEach(perm => {
      if (perm.permissions[0]) {
        perm.permissions.forEach(p => {
          if (p === 'botDeveloper') {
            if (!process.env.BOT_DEVELOPERS.includes(this.member.user.id)) perms.push(p)
          } else {
            if (!this.member.permissions.has(p)) perms.push(p)
          }
        })
      }
    })

    return perms
  }

  botHas(permissions) {
    const perms = []
    permissions.filter(({ entity }) => entity === 'both' ? 'bot' : 'bot').forEach(perm => {
      if (perm.permissions[0]) {
        perm.permissions.forEach(p => {
          if (!this.guild.members.get(this.client.user.id).permissions.has(p)) perms.push(p)
        })
      }
    })

    return perms
  }
}