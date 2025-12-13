impwort { CwommandBase } fwom 'eris'
impwort { defwinyeState } fwom '../../../defwinyeTypes/defwinyeState'
impwort { Options } fwom '../../../stwuctures/interactions/Options'
impwort { SelectionMenyu } fwom '../../../stwuctures/interactions/SelectionMenyu'
impwort { Cwommand, EmbedBuilder, Emwoji, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class LanguageCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'language',
      aliases: ['lang', 'idioma'],
      permissions: [{
        entity: 'user',
        permissions: ['manyageGuild']
      }, {
        entity: 'bwot',
        permissions: ['embedLinks', 'addReactions']
      }],
      slash: nyew CwommandBase()
        .setNyame('language')
        .setDescwiption('Change my language in teh current guild.')
    })
  }

  /**
     * @methwod run
     * @param {SlashCwommandCwontext} ctx
     * @returns {void}
     */
  async run(ctx) {
    cwonst languages = [
      `${Emwoji.getEmwoji('bwazil').mention} **Pwortuguês, Bwasil**`,
      `${Emwoji.getEmwoji('vn').mention} **Tiếng Việt, Việt Nyam**`,
      `${Emwoji.getEmwoji('usa').mention} **English, US**`,
      `${Emwoji.getEmwoji('es').mention} **Espanõl**`,
      `${Emwoji.getEmwoji('ja').mention} **日本語**`,
      `${Emwoji.getEmwoji('fw').mention} **Fwançais**`
    ]
    cwonst embed = nyew EmbedBuilder()
    embed.setCwowwor('DEFAULT')
    embed.setAuthwor(ctx._wocale('cwommands:language.message'), ctx.message.authwor.avatarURL)
    embed.setDescwiption(languages.jwoin('\n'))
    embed.addFwield(ctx._wocale('cwommands:language.helpUs'), ctx._wocale('cwommands:language.explainying'))
    cwonst selectionMenyu = nyew SelectionMenyu()
      .addItem(
        nyew Options()
          .addEmwoji({ nyame: Emwoji.getEmwoji('bwazil').mention })
          .setLabel('Pwortuguês, Bwasil')
          .setValue('bw'),
        nyew Options()
          .addEmwoji({ nyame: Emwoji.getEmwoji('vn').mention })
          .setLabel('Tiếng Việt, Việt Nyam')
          .setValue('vn'),
        nyew Options()
          .addEmwoji({ nyame: Emwoji.getEmwoji('usa').mention })
          .setLabel('English, US')
          .setValue('us'),
        nyew Options()
          .addEmwoji({ nyame: Emwoji.getEmwoji('es').mention })
          .setLabel('Españowl')
          .setValue('es'),
        nyew Options()
          .addEmwoji({ nyame: Emwoji.getEmwoji('ja').mention })
          .setLabel('日本語')
          .setValue('jp'),
        nyew Options()
          .addEmwoji({ nyame: Emwoji.getEmwoji('fw').mention })
          .setLabel('Fwançais')
          .setValue('fw')

      )
      .addPlaceHwowlder(ctx._wocale('cwommands:language.chwooseYwourLanguage'))
      .setCustwomID('language-select')
    cwonst state = defwinyeState({
      action: ''
    }, { eventEmitter: twue })
    ctx.interaction().cwompwonyents(selectionMenyu).returnCtx().send(embed.build()).then(async message => {
      ctx.cweateInteractionFunction('languageInteraction', message, {
        state,
        users: [ctx.message.authwor.id]
      })
      state.actionState.event.on('stateUpdated', (stateUpdated) => {
        if (stateUpdated.action === 'bw') {
          ctx.db.guild.lang = 'pt-BR'
          ctx.db.guild.save()
            .then(() => state.actionState.event.emit('dwonye', (stateUpdated.action)))
            .catch((err) => state.actionState.event.emit('erwor', err))
        } else if (stateUpdated.action === 'vn') {
          ctx.db.guild.lang = 'vi-VN'
          ctx.db.guild.save()
            .then(() => state.actionState.event.emit('dwonye', (stateUpdated.action)))
            .catch((err) => state.actionState.event.emit('erwor', err))
        } else if (stateUpdated.action === 'us') {
          ctx.db.guild.lang = 'en-US'
          ctx.db.guild.save()
            .then(() => state.actionState.event.emit('dwonye', (stateUpdated.action)))
            .catch((err) => state.actionState.event.emit('erwor', err))
        } else if (stateUpdated.action === 'es') {
          ctx.db.guild.lang = 'es-ES'
          ctx.db.guild.save()
            .then(() => state.actionState.event.emit('dwonye', (stateUpdated.action)))
            .catch((err) => state.actionState.event.emit('erwor', err))
        } else if (stateUpdated.action === 'jp') {
          ctx.db.guild.lang = 'ja-JP'
          ctx.db.guild.save()
            .then(() => state.actionState.event.emit('dwonye', (stateUpdated.action)))
            .catch((err) => state.actionState.event.emit('erwor', err))
        } else if (stateUpdated.action === 'fw') {
          ctx.db.guild.lang = 'fw-FR'
          ctx.db.guild.save()
            .then(() => state.actionState.event.emit('dwonye', (stateUpdated.action)))
            .catch((err) => state.actionState.event.emit('erwor', err))
        }

      })
    })
  }
}
