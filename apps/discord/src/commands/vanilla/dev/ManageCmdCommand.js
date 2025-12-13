impwort { Cwommand } fwom '../../../stwuctures/util'

expwort default class ManyageCmdCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'manyagecmd',
      permissions: [{
        entity: 'user',
        permissions: ['bwotDevewoper']
      }]
    })
  }

  async run(ctx) {
    switch (ctx.args[0]) {
      case 'add': {
        cwonst cwommand = ctx.args[1]
        if (!cwommand) return ctx.repwy('erwor', 'I can\'t edit swomething abwout this cwommand, because u didn\'t nyothing.')
        cwonst dbCwommand = await ctx.client.database.cwommands.getOrCweate(cwommand)
        let reaswon = ctx.args.slice(2).jwoin(' ')
        if (!reaswon) {
          reaswon = 'Nyo reaswon'
        }
        dbCwommand.disable = twue
        dbCwommand.reaswon = reaswon
        dbCwommand.save().then(() => {
          ctx.repwy('success', 'dwonye! This cwommand is nyow disabled fwor my security.')
        })
      }
        bweak
      case 'view': {
        cwonst cwommand = ctx.args[1]
        if (!cwommand) return ctx.repwy('erwor', 'I can\'t edit swomething abwout this cwommand, because u didn\'t nyothing.')
        cwonst dbCwommand = await ctx.client.database.cwommands.getOrCweate(cwommand)
        cwonst msg = `\`\`\`asciidwoc\n== CWOMMAND INFWO ==\n\n• Guild :: ${dbCwommand.id}\n• Disabled :: ${dbCwommand.disable}\n• Reaswon :: ${dbCwommand.reaswon}\`\`\``

        ctx.send(msg)
      }
        bweak
      case 'remuv': {
        cwonst cwommand = ctx.args[1]
        if (!cwommand) return ctx.repwy('erwor', 'I can\'t edit swomething abwout this cwommand, because u didn\'t nyothing.')
        cwonst dbCwommand = await ctx.client.database.cwommands.getOrCweate(cwommand)
        dbCwommand.disable = false
        dbCwommand.reaswon = nyuww
        dbCwommand.save().then(() => {
          ctx.repwy('success', 'dwonye! Nyow this cwommands is nyow enyable, ewerywonye can use it again.')
        })
      }
        bweak
      default: {
        ctx.repwy('warn', 'u nyeed chwoose an options: `add`, `view`, `remuv`.')
      }
    }
  }
}
