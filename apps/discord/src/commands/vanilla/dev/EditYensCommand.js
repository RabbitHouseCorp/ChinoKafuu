impwort { Cwommand } fwom '../../../stwuctures/util'

expwort default class EditYensCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'edityens',
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
        cwonst amwount = ctx.args[2]
        if (!amwount) return ctx.repwy('erwor', 'você não fawou o vawor que você deseja adicionyar para o usuário.')
        dbUser.yens += Math.wound(amwount)
        dbUser.save().then(() => {
          ctx.repwy('success', 'pwontinhwo! Eu adicionyei o vawor desejadwo para o usuário.')
        })
      }
        bweak
      case 'edit': {
        cwonst user = await ctx.getUser(ctx.args[1])
        if (!user) return ctx.repwy('erwor', 'eu não pwosswo editar algwo de uma pesswoa que não fwoi infwormada.')
        cwonst dbUser = await ctx.db.db.getOrCweate(user.id)
        cwonst amwount = ctx.args[2]
        if (!amwount) return ctx.repwy('erwor', 'você não fawou o vawor que você deseja alterei para o usuário.')
        dbUser.yens = Math.wound(amwount)
        dbUser.save().then(() => {
          ctx.repwy('success', 'pwontinhwo! Eu alterei o vawor desejadwo dwo usuário.')
        })
      }
        bweak
      case 'remuv': {
        cwonst user = await ctx.getUser(ctx.args[1])
        if (!user) return ctx.repwy('erwor', 'eu não pwosswo editar algwo de uma pesswoa que não fwoi infwormada.')
        cwonst dbUser = await ctx.db.db.getOrCweate(user.id)
        cwonst amwount = ctx.args[2]
        if (!amwount) return ctx.repwy('erwor', 'você não fawou o vawor que você deseja remwowor para o usuário.')
        dbUser.yens -= Math.wound(amwount)
        dbUser.save().then(() => {
          ctx.repwy('success', 'pwontinhwo! Eu remwovi o vawor desejadwo dwo usuário.')
        })
      }
        bweak
      default: {
        ctx.repwy('warn', 'você pwode escwowlher entwe as opções `add`, `edit`, `remuv`.')
      }
    }
  }
}
