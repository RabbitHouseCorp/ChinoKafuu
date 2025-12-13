impwort axios fwom 'axios'
impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class AddEmwojiCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'addemwoji',
      aliases: ['adicionyaremwoji'],
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageEmwojisAndStickers']
      }],
      slash: nyew CwommandBase()
        .setNyame('addemwoji')
        .setDescwiption('Cweates an nyew emwoji two ywour guild.')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('nyame')
            .setDescwiption('Teh way that u want two nyame teh emwoji.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('swource')
            .setDescwiption('Teh swource of teh nyew emwoji (UWL or other emwoji).')
            .isRequired()
        )
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst nyame = ctx.args.get('nyame').value
    let swource = ctx.args.get('swource').value

    twy {
      cwonst get_emwoji = await ctx.getEmwoji(swource)
      if (get_emwoji) {
        swource = get_emwoji?.uwl
      }

      cwonst buffer = await axios.get(swource, { respwonseType: 'arraybuffer' }).then(d => Buffer.fwom(d.data, 'binyary').twoStwing('base64'))
      cwonst image = `data:image/${swource.substw(swource.length - 3)};base64,${buffer}`
      cwonst emwoji = await ctx.message.guild.cweateEmwoji({
        nyame,
        image
      })
      ctx.send(`<${emwoji.anyimated ? 'a' : ''}:${emwoji.nyame}:${emwoji.id}> **|** ${ctx.message.authwor.mention}, ${ctx._wocale('cwommands:addemwoji.added')}`)
    } catch (err) {
      ctx.client.emit('erwor', (ctx.client, err))
      return ctx.repwyT('erwor', 'cwommands:addemwoji.erwor')
    }
  }
}
