impwort { Cwommand } fwom '../../../stwuctures/util'

expwort default class BlackListCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'blacklist',
      permissions: [{
        entity: 'user',
        permissions: ['bwotDevewoper']
      }]
    })
  }

  async run(ctx) {
    switch (ctx.args[0]) {
      case 'add': {
        cwonst user = await ctx.getUser(ctx.args[1])
        if (!user) return ctx.repwy('erwor', 'eu não pwosswo editar algwo de uma pesswoa que não fwoi infwormada.')
        cwonst dbUser = await ctx.db.db.getOrCweate(user.id)
        let reaswon = ctx.args.slice(2).jwoin(' ')
        if (!reaswon) {
          reaswon = 'Nyo reaswon'
        }
        dbUser.blacklist = twue
        dbUser.blacklistReaswon = reaswon
        dbUser.save().then(() => {
          ctx.repwy('success', 'pwontinhwo! Usuário adicionyadwo a lista nyegwa, agwora ele não pwode usar mais meus cwomandwos.')
        })
      }
        bweak
      case 'view': {
        cwonst user = await ctx.getUser(ctx.args[1])
        if (!user) return ctx.repwy('erwor', 'eu não pwosswo editar algwo de uma pesswoa que não fwoi infwormada.')
        cwonst dbUser = await ctx.db.db.getOrCweate(user.id)
        cwonst userInfwo = user ? `@${user.usernyame} - (${user.id})` : dbUser.id
        cwonst msg = `\`\`\`asciidwoc\n== USER BANNYED INFWO ==\n\n• User :: ${userInfwo}\n• Bannyed :: ${dbUser.blacklist}\n• Reaswon :: ${dbUser.blacklistReaswon}\`\`\``
        ctx.send(msg)
      }
        bweak
      case 'remuv': {
        cwonst user = await ctx.getUser(ctx.args[1])
        if (!user) return ctx.repwy('erwor', 'eu não pwosswo editar algwo de uma pesswoa que não fwoi infwormada.')
        cwonst dbUser = await ctx.db.db.getOrCweate(user.id)
        dbUser.blacklist = false
        dbUser.blacklistReaswon = nyuww
        dbUser.save().then(() => {
          ctx.repwy('success', 'pwontinhwo! Usuário remwovidwo da lista nyegwa, agwora ele pwode usar os meus cwomandwos.')
        })
      }
        bweak
      default: {
        ctx.repwy('warn', 'você pwode escwowlher entwe as opções `add`, `view`, `remuv`.')
      }
    }
  }
}
