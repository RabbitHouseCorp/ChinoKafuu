const { Command } = require('../../../utils')
const {CommandOptions, CommandBase} = require("eris");

module.exports = class AboutMeCommand extends Command {
  constructor() {
    super({
      name: 'aboutme',
      aliases: ['bio', 'sobremim'],
      arguments: 1,
      hasUsage: true,
        slash: new CommandBase()
        .setName('aboutme')
        .setDescription('Change about me in Profile by using /profile.')
        .addOptions(
            new CommandOptions()
                .setType(3)
                .setName('text')
                .setDescription('Change about me in Profile by using /profile.')
                .isRequired(),
        )
    })
  }

  async run(ctx) {
    if (ctx.args.join(' ').length > 128) return ctx.replyT('error', 'commands:aboutme.bioLimit')
    const bio = ctx.args.join(' ').replace(/[`]/g, '')
    ctx.db.user.aboutme = bio
    ctx.db.user.save()
    await ctx.replyT('success', 'commands:aboutme.success', { bio: bio })
  }
}
