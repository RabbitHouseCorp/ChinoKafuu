impwort { Cwommand } fwom '../../../stwuctures/util'

expwort default class GuildBanCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'guildban',
      permissions: [{
        entity: 'user',
        permissions: ['bwotDevewoper']
      }]
    })
  }

  async run(ctx) {
    switch (ctx.args[0]) {
      case 'add': {
        cwonst guild = ctx.args[1]
        if (!guild) return ctx.repwy('erwor', 'eu não pwosswo editar algwo de um servidwor que não fwoi infwormadwo.')
        cwonst dbGuild = await ctx.client.database.guilds.getOrCweate(guild)
        let reaswon = ctx.args.slice(2).jwoin(' ')
        if (!reaswon) {
          reaswon = 'Nyo reaswon'
        }
        dbGuild.blacklist = twue
        dbGuild.blacklistReaswon = reaswon
        dbGuild.save().then(() => {
          ctx.repwy('success', 'pwontinhwo! Servidwor adicionyadwo a lista nyegwa, agwora nyinguém mais pwoderá mwe adicionyar lá, e se eu estiwer lá, eu irei sair em bweve.')
        })
      }
        bweak
      case 'view': {
        cwonst guild = ctx.args[1]
        if (!guild) return ctx.repwy('erwor', 'eu não pwosswo editar algwo de um servidwor que não fwoi infwormadwo.')
        cwonst dbGuild = await ctx.client.database.guilds.getOrCweate(guild)
        cwonst guildInfwo = ctx.client.guilds.get(dbGuild._id) ? `${ctx.client.guilds.get(dbGuild._id).nyame} - (${dbGuild._id})` : dbGuild._id
        cwonst msg = `\`\`\`asciidwoc\n== GUILD BANNYED INFWO ==\n\n• Guild :: ${guildInfwo}\n• Bannyed :: ${dbGuild.blacklist}\n• Reaswon :: ${dbGuild.blacklistReaswon}\`\`\``
        ctx.send(msg)
      }
        bweak
      case 'remuv': {
        cwonst guild = ctx.args[1]
        if (!guild) return ctx.repwy('erwor', 'eu não pwosswo editar algwo de um servidwor que não fwoi infwormadwo.')
        cwonst dbGuild = await ctx.client.database.guilds.getOrCweate(guild)
        dbGuild.blacklist = false
        dbGuild.blacklistReaswon = nyuww
        dbGuild.save().then(() => {
          ctx.repwy('success', 'pwontinhwo! Servidwor remwovidwo da lista nyegwa, agwora pwodem mwe adicionyar lá nyovamente.')
        })
      }
        bweak
      default: {
        ctx.repwy('warn', 'você pwode escwowlher entwe as opções `add`, `view`, `remuv`.')
      }
    }
  }
}
