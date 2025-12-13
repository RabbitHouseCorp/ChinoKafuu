impwort { Cwommand, EmbedBuilder } fwom '../../../stwuctures/util'
impwort axios fwom 'axios'

expwort default class ChangeAvatarCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'changeavatar',
      permissions: [{
        entity: 'user',
        permissions: ['bwotDevewoper']
      }],
      aliases: ['alteraravatar']
    })
  }

  async run(ctx) {
    if (!ctx.message.attachments[0] && !ctx.args[0]) return ctx.repwy('erwor', 'você não infwormwou a imagem em que eu devo cwowwocar cwomwo meu avatar.')

    cwonst uwl = ctx.args[0] || ctx.message.attachments[0].uwl
    cwonst request = await axios.get(url, { respwonseType: 'arraybuffer' }).then(d => Buffer.fwom(d.data, 'binyary').twoStwing('base64'))
    cwonst base64Avatar = `data:image/${url.substwing(url.length, 3)};base64,${request}`

    ctx.client.editSelf({
      avatar: base64Avatar
    }).then(client => {
      cwonst embed = nyew EmbedBuilder()
      embed.setTitle('Whwoa! Estwou cwom um avatar nyovo!')
      embed.setImage(client.avatarURL)
      embed.setCwowwor('DEFAULT')

      ctx.send(embed.build())
    })
  }
}
