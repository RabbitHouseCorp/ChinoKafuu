const { Command, EmbedBuilder, ReactionCollector, Emoji, ResponseAck} = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')
const SelectionMenu = require('../../../structures/interactions/SelectionMenu');
const Options = require("../../../structures/interactions/Options");
const CommandInteractions = require("../../../structures/interactions/CommandInteractions");

module.exports = class LanguageCommand extends Command {
  constructor() {
    super({
      name: 'language',
      aliases: ['lang', 'idioma'],
      permissions: [{
        entity: 'user',
        permissions: ['manageGuild']
      }, {
        entity: 'bot',
        permissions: ['embedLinks', 'addReactions']
      }],
      slash: new CommandBase()
        .setName('language')
        .setDescription('Change my language in the current guild.')
    })
  }

  async run(ctx) {
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setAuthor(ctx._locale('commands:language.message'), ctx.message.author.avatarURL)
    embed.setDescription('🇧🇷 **Português, Brasil**\n🇻🇳 **Tiếng Việt, Việt Nam**\n🇺🇸 **English, US**\n🇪🇸 **Espanõl**\n🇯🇵 **日本語**')
    embed.addField(ctx._locale('commands:language.helpUs'), ctx._locale('commands:language.explaining'))
    const selectionMenu = new SelectionMenu()
        .addItem(
            new Options()
                .addEmoji({
                  name: '🇧🇷'
                })
                .setLabel('Brasil')
                .addDescription('Português')
                .setValue('br'),
            new Options()
                .addEmoji({
                  name: '🇻🇳'
                })
                .setLabel('Việt Nam')
                .addDescription('Tiếng Việt')
                .setValue('vn'),
            new Options()
                .addEmoji({
                  name: '🇺🇸'
                })
                .setLabel('US')
                .addDescription('English')
                .setValue('us'),
            new Options()
                .addEmoji({
                  name: '🇪🇸'
                })
                .setLabel('Espanõl')
                .setValue('es'),
            new Options()
                .addEmoji({
                  name: '🇯🇵'
                })
                .setLabel('日本語')
                .setValue('jp'),

        )
        .addPlaceHolder('{locale}')
        .setCustomID('testing')
    ctx
        .interaction()
        .components(selectionMenu)
        .returnCtx()
        .send(embed.build()).then(async message => {
      const ack = new ResponseAck(message)

      ack.on('collect', ({messageCollect, interaction}) => {
        if (message.id === messageCollect.id) {
          selectionMenu.isDisable()
          switch (interaction.values[0]) {
            case 'br': {
              ctx.db.guild.lang = 'pt-BR'
              ctx.db.guild.save().then(() => {
                ack.sendAck('update', {
                  content: ctx.replyTData('success', 'agora eu irei falar em `Português, Brasil`.').content,
                  embeds: [],
                  components: []
                })
              })
            }
              break
            case 'vn': {
              ctx.db.guild.lang = 'vi-VN'
              ctx.db.guild.save().then(() => {
                ack.sendAck('update', {
                  content: ctx.replyTData('success', 'bây giờ tôi sẽ nói `Tiếng Việt, Việt Nam`.').content,
                  embeds: [],
                  components: []
                })
              })
            }
              break
            case 'us': {
              ctx.db.guild.lang = 'en-US'
              ctx.db.guild.save().then(() => {
                ack.sendAck('update', {
                  content: ctx.replyTData('success', 'now I\'ll speak `English, US`.').content,
                  embeds: [],
                  components: []
                })
              })
            }
              break
            case 'es': {
              ctx.db.guild.lang = 'es-ES'
              ctx.db.guild.save().then(() => {
                ack.sendAck('update', {
                  content: ctx.replyTData('success', 'ahora hablaré en `Espanõl`.').content,
                  embeds: [],
                  components: []
                })
              })
            }
              break
            case 'jp': {
              ctx.db.guild.lang = 'ja-JP'
              ctx.db.guild.save().then(() => {
                ack.sendAck('update', {
                  content: ctx.replyTData('success', '今、私は`日本語`で話します').content,
                  embeds: [],
                  components: []
                })
              })
            }
              break
          }

        }
      })

    })
  }
}
