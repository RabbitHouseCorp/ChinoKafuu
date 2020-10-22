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
    const lang = this.context.db.guild.lang
    const commandName = '`' +  `${this.context.db.guild.prefix}${this.name}` + '` '
    const commandWithUsage = commandName + usage.map(element => '\`' + element + '\`').join(' ')
    const embedDescription = lang === 'pt-BR' ?  `**Como usar?** ${commandWithUsage}` : `\n\n**How to use?** ${commandWithUsage}`
    const aliases = this.aliases.join(', ') || ':x:'
    const embed = new EmbedBuilder()
      .setTitle('`' + `${this.context.db.guild.prefix}${this.name}` + '`')
      .setColor('DEFAULT')
      .setDescription(this.description + embedDescription)
      .addField(lang === 'pt-BR' ? 'Alternativas' : 'Aliases', aliases)
    return this.context.send(embed)
  }
}
