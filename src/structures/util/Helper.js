const EmbedBuilder = require('../../structures/util/EmbedBuilder')

module.exports = class Helper {
  constructor(context, commandName, commandAliases, commandUsage, commandDescription) {
    this.context = context
    this.name = commandName
    this.aliases = commandAliases
    this.usage = commandUsage
    this.description = commandDescription
  }

  help() {
    const usage = this.usage.split(' ')
    const commandName = `${this.context.db.guild.prefix}${this.name}`
    const commandWithUsage = `\`${commandName}\` ${usage.map(element => `\`${element}\``).join(' ')}`
    const embedDescription = `\n\n**${this.context.t('basic:howToUse')}** ${commandWithUsage}`
    const aliases = this.aliases.join(', ') || this.context.t('basic:noAliases')
    const embed = new EmbedBuilder()
      .setTitle(`\`${this.context.db.guild.prefix}${this.name}\``)
      .setColor('DEFAULT')
      .setDescription(`${this.description}${embedDescription}`)
      .addField(this.context.t('basic:aliases'), aliases)
    return this.context.send(embed)
  }
}
