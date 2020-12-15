const { Command, EmbedBuilder, version } = require('../../utils')
const moment = require('moment')
const os = require('os')
require('moment-duration-format')
module.exports = class BotInfoCommand extends Command {
    constructor() {
        super({
            name: 'botinfo',
            aliases: ['infobot'],
            arguments: 0,
            permissions: [{
                entity: 'bot',
                permissions: ['embedLinks']
            }]
        })
    }

    async run(ctx) {
        const shard = ctx.client.shardUptime.get(ctx.message.channel.guild.shard.id)
        const embed = new EmbedBuilder()
        embed.setColor('DEFAULT')
        embed.setTitle(ctx._locale('commands:botinfo.title'))
        embed.setDescription(ctx._locale('commands:botinfo.inviteMe'))
        embed.setFooter(`©️ ${ctx.client.user.username}`)
        embed.setTimestamp()
        embed.setUrl('https://discordapp.com/oauth2/authorize?client_id=481282441294905344&scope=bot&permissions=2117578239')
        embed.addField(ctx._locale('commands:botinfo.guildsAmount'), this.markDown('js', Number(ctx.client.guilds.size).toLocaleString()), true)
        embed.addField(ctx._locale('commands:botinfo.usersAmount'), this.markDown('js', Number(ctx.client.users.size).toLocaleString()), true)
        embed.addBlankField()
        embed.addField(ctx._locale('commands:botinfo.shardLatency'), this.markDown('glsl', `#[Shard: ${shard.shardID}] ${ctx.message.channel.guild.shard.latency}ms`), true)
        embed.addField(ctx._locale('commands:botinfo.memoryUsage'), this.markDown('glsl', `#${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`), true)
        embed.addField(ctx._locale('commands:botinfo.clientVersion'), this.markDown('glsl', `#${version}`), true)
        embed.addField(ctx._locale('commands:botinfo.shardUptime'), this.markDown('js', `${moment.duration(Date.now() - shard.uptime).format("dd:hh:mm:ss", { stopTrim: "d" })}`), true)
        embed.addField(ctx._locale('commands:botinfo.cpuModel'), this.markDown('diff', `- ${os.cpus().map(i => i.model)[0]}`), true)
        embed.addBlankField()
        embed.addField(ctx._locale('commands:botinfo.supportServer'), `[${ctx._locale('basic:clickHere')}](https://discord.gg/CAm9cSU)`, true)
        embed.addField('Github', `[${ctx._locale('basic:clickHere')}](https://github.com/RabbitHouseCorp/ChinoKafuu)`, true)
        embed.addField('Twitter', '[@ChinoKafuuBot](https://twitter.com/ChinoKafuuBot)', true)
        embed.addField('top.gg', '[top.gg](https://top.gg/bot/481282441294905344/vote)', true)
        embed.addField('Zuraaa.com', '[Zuraaa.com](https://zuraaa.com/bots/481282441294905344/votar)', true)
        embed.addField('Crowdin', '[rabbithouse.crowdin.com](https://rabbithouse.crowdin.com/chino-kafuu)', true)

        ctx.send(embed.build())
    }


    markDown(code, text) {
        return `\`\`\`${code}\n${text}\`\`\``
    }
}