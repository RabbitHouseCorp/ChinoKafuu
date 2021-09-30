const { Command } = require('../../../../utils')
const SelectionMenu = require('../../../../structures/interactions/SelectionMenu');
const Options = require('../../../../structures/interactions/Options');
const { ResponseAck } = require("../../../../utils");

module.exports = class AnimuConfigSubCommand extends Command {
  constructor() {
    super({
      name: 'config animu',
      aliases: ['module', 'configurações', 'configurar'],
      permissions: [{
        entity: 'user',
        permissions: ['manageGuild']
      },
      {
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  run(ctx) {
    const selectionMenu = new SelectionMenu()
      .maxValues(1)
      .minValues(1)
      .addItem(
        new Options()
          .setLabel(ctx._locale('commands:config.select.enable'))
          .addDescription(ctx._locale('commands:config.select.enableDescription'))
          .setValue('set'),
        new Options()
          .setLabel(ctx._locale('commands:config.select.disable'))
          .addDescription(ctx._locale('commands:config.select.disableDescription'))
          .setValue('disable')
      )
      .addPlaceHolder(ctx._locale('commands:config.chooseYourAction'))
      .setCustomID('config-select')
    ctx
      .interaction()
      .components(selectionMenu)
      .returnCtx()
      .send('Select option')
      .then(async (message) => {
        let interactionType = null
        const ack = new ResponseAck(message)
        ack.on('collect', ({ messageCollect, interaction }) => {
          const components = []
          const channels = []
          if ((interactionType === null)) {
            interactionType = interaction.values[0]
            switch (interactionType) {
              case 'set': {
                ctx.message.guild.channels.forEach(value => {
                  if (value.type === 2 || value.type === 13) {
                    if (!(components.length > 24)) {
                      components.push(
                        new Options()
                          .setLabel(value.name)
                          .addDescription(value.id)
                          .setValue(value.id)
                      )
                      channels.push(value)
                    }
                  }
                })
                const selectionMenuUpdate = new SelectionMenu()
                  .maxValues(1)
                  .minValues(1)
                  .addItem(components)
                  .addPlaceHolder(ctx._locale('commands:config.select.options.voiceChannel'))
                  .setCustomID('channel-select')
                ack.sendAck('update', {
                  content: ctx._locale('commands:config.select.voiceChannel'),
                  components: [{ type: 1, components: [selectionMenuUpdate] }]
                })
              }
                break
              case 'disable': {
                ctx.db.guild.animu = false
                ctx.db.guild.animuChannel = ''
                ctx.db.guild.save()
                ack.sendAck('update', {
                  content: ctx._locale('commands:config.modules.animu.disable'),
                  components: []
                })
              }
            }
          } else {
            // Select Page
            const channel = ctx.message.guild.channels.get(interaction.values[0])
            if ((channel === null)) {
              channels.forEach((value) => {
                channels.pop()
              })
              components.forEach((value) => {
                components.pop()
              })
              interactionType = null;
              ack.sendAck('update', {
                content: ctx._locale('commands:config.channel.voiceNoLogerExist'),
                components: [{ type: 1, components: [selectionMenuUpdate] }]
              })
            } else {
              ctx.db.guild.animu = true
              ctx.db.guild.animuChannel = channel.id
              ctx.db.guild.save()

              ack.sendAck('update', {
                content: ctx._locale('commands:config.select.voiceChannel', { 0: channel.name, 1: channel.id }),
                components: []
              })
            }
          }
        })
      })
  }
}