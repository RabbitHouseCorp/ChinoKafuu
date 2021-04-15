const { Command } = require('../../utils')

module.exports = class BlackListCommand extends Command {
  constructor () {
    super({
      name: 'blacklist',
      permissions: [{
        entity: 'user',
        permissions: ['botDeveloper']
      }]
    })
  }

  async run (ctx) {
    switch (ctx.args[0]) {
      case 'add': {
        let user = ctx.args[1]
        if (!user) return ctx.reply('error', 'eu não posso editar algo de uma pessoa que não foi informada.')
        user = user.replace(/[<@!>]/g, '')
        const dbUser = await ctx.db.db.getOrCreate(user)
        let reason = ctx.args.slice(2).join(' ')
        if (!reason) {
          reason = 'No reason'
        }
        dbUser.blacklist = true
        dbUser.blacklistReason = reason
        dbUser.save().then(() => {
          ctx.reply('success', 'prontinho! Usuário adicionado a lista negra, agora ele não pode usar mais meus comandos.')
        })
      }
        break
      case 'view': {
        let user = ctx.args[1]
        if (!user) return ctx.reply('error', 'eu não posso editar algo de uma pessoa que não foi informada.')
        user = user.replace(/[<@!>]/g, '')
        const dbUser = await ctx.db.db.getOrCreate(user)
        const userInfo = ctx.client.users.get(dbUser._id) ? `${ctx.client.users.get(dbUser._id).username}#${ctx.client.users.get(dbUser._id).discriminator} - (${dbUser._id})` : dbUser._id
        const msg = `\`\`\`asciidoc\n== USER BANNED INFO ==\n\n• User :: ${userInfo}\n• Banned :: ${dbUser.blacklist}\n• Reason :: ${dbUser.blacklistReason}\`\`\``
        ctx.send(msg)
      }
        break
      case 'remove': {
        let user = ctx.args[1]
        if (!user) return ctx.reply('error', 'eu não posso editar algo de uma pessoa que não foi informada.')
        user = user.replace(/[<@!>]/g, '')
        const dbUser = await ctx.db.db.getOrCreate(user)
        dbUser.blacklist = false
        dbUser.blacklistReason = null
        dbUser.save().then(() => {
          ctx.reply('success', 'prontinho! Usuário removido da lista negra, agora ele pode usar os meus comandos.')
        })
      }
        break
      default: {
        ctx.reply('warn', 'você pode escolher entre as opções `add`, `view`, `remove`.')
      }
    }
  }
}
