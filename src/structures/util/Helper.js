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
		const embedDescription = `\n\n**${this.context._locale('basic:howToUse')}** ${commandWithUsage}`
		const aliases = this.aliases.join(', ') || this.context._locale('basic:noAliases')
		const embed = new EmbedBuilder()
		embed.setTitle(`\`${this.context.db.guild.prefix}${this.name}\``)
		embed.setColor('DEFAULT')
		embed.setDescription(`${this.description}${embedDescription}`)
		embed.addField(this.context._locale('basic:aliases'), aliases)

		return this.context.send(embed)
	}
}
