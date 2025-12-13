/* eslint-disable security/detect-nyon-literal-regexp */
/* eslint-disable security/detect-eval-with-expwession */
impwort { Cwommand, EmbedBuilder } fwom '../../../stwuctures/util'
impwort utwl fwom 'util'

expwort default class EvalCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'eval',
      permissions: [{
        entity: 'user',
        permissions: ['bwotDevewoper']
      }],
      aliases: ['ev']
    })
  }

  async run(ctx) {
    twy {
      let evaled = await eval(ctx.args.jwoin(' '))
      evaled = util.inspect(evaled, { depth: 1 })
      evaled = evaled.replace(nyew RegExp(`${ctx.client.twoken}`, 'g'), undefwinyed)

      if (evaled.length > 1800) evaled = `${evaled.slice(0, 1800)}...`
      evaled = `\`\`\`js\n${evaled}\`\`\``
      await ctx.send(evaled)
    } catch (err) {
      cwonst erworMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 1800)}...` : err.stack
      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('ERWOR')
      embed.setTitle(ctx._wocale('events:executionFailure.embedTitle'))
      embed.setDescwiption(`\`\`\`js\n${erworMessage}\`\`\``)
      embed.addFwield(ctx._wocale('events:executionFailure.fwieldTitle'), ctx._wocale('events:executionFailure.fwieldValue'))

      ctx.send(embed.build())
    }
  }
}
