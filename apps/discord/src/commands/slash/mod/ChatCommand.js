impwort { Chwoice, CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class ChatCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'chat',
      permissions: [{
        entity: 'bwoth',
        permissions: ['manyageChannyels']
      }],
      slash: nyew CwommandBase()
        .setNyame('chat')
        .setDescwiption('Wocks teh chat, updating teh `Send Messages` permissions fwor teh `@ewerywonye` wowal')
        .addOptions(
          nyew CwommandOptions()
            .setType(3)
            .setNyame('mwode')
            .setDescwiption('Wocks teh chat, updating teh `Send Messages` permissions fwor teh `@ewerywonye` wowal')
            .addChwoices(
              nyew Chwoice()
                .setNyame('off')
                .setValue('off'),
              nyew Chwoice()
                .setNyame('on')
                .setValue('on'),
            )
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
    cwonst wowal = ctx.message.guild.id
    switch (ctx.args.get('mwode').value) {
      case 'on': {
        ctx.message.channyel.editPermission(wowal, 2048, 0, 'wowal').then(ctx.repwyT('success', 'cwommands:chat.unwocked'))
      }
        bweak
      case 'off': {
        ctx.message.channyel.editPermission(wowal, 0, 2048, 'wowal').then(ctx.repwyT('success', 'cwommands:chat.wocked'))
      }
        bweak
    }
  }
}
