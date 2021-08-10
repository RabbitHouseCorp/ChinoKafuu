const { Command } = require('../../../utils')
const axios = require('axios')
const {CommandBase, CommandOptions} = require("eris");

module.exports = class LicenseCommand extends Command {
  constructor() {
    super({
      name: 'license',
      aliases: ['licence', 'licenca', 'licença'],
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['attachFiles']
      }],
      slash: new CommandBase()
          .setName('license')
          .setDescription('Are you licensed? No? Then create one for yourself! Or for someone else.')
          .addOptions(
              new CommandOptions()
                  .setType(6)
                  .setName('user')
                  .setDescription('Mention the member on the server'),
              new CommandOptions()
                  .setType(3)
                  .setName('text')
                  .setDescription('Enter random text'),
          )
    })
  }

  async run(ctx) {
    const guild = ctx.message.guild
    let member = await ctx.getUser(ctx.message.command.interface.get('user').value.id, true)
    let hoist
    if (guild.members.get(member.id)) {
      const role = guild.members.get(member.id).roles
        .map((a) => ctx.message.guild.roles.get(a))
        .filter((z) => z)
        .sort((a, b) => b.position - a.position)
      hoist = role[0]
    }

    let highRole = guild.roles.get(hoist?.id)?.color.toString(16)
    if (!highRole || highRole <= 0) highRole = '#000000'
    const buffer = await axios({
      url: 'http://127.0.0.1:1234/render/license',
      method: 'post',
      data: {
        name: member.username,
        text: `${ctx._locale('commands:license.licensedFor')}: ${(member.id === ctx.message.member.id) ? ctx.message.command.interface.get('text').value || ctx._locale('commands:license.beCute') : ctx.message.command.interface.get('text').value || ctx._locale('commands:license.beCute')}`,
        hexColor: highRole,
        avatarUrl: ctx.message.guild.members.get(ctx.message.command.interface.get('user').value.id)?.guildAvatar ?? member.dynamicAvatarURL('png', 2048)
      },
      responseType: 'arraybuffer'
    })

    ctx.send('', { file: { file: buffer.data, name: 'license.png' } })
  }
}
