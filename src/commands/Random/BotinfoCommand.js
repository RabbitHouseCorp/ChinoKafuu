const Command = require("../../structures/command")
const Discord = require('discord.js')
const client = new Discord.Client()
const moment = require('moment');
require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")

module.exports = class BotinfoCommand extends Command {
    constructor(client) {
       super(client, {
           name: 'botinfo',
           category: 'random',
           aliases: []
        })
    } 
    run({message, args, server}, t) {

        let color = this.client.colors.default
        let client = this.client
        const duration = moment.duration(client.uptime).format(" dd[d] hh[h] mm[m] ss[s]");
        moment.locale(server.lang);
        cpuStat.usagePercent(function(err, percent, seconds) {
            const embed = new Discord.RichEmbed()
            .setColor(color)
            .setThumbnail('https://images-ext-2.discordapp.net/external/gLz09AFgWmMbGyAk42-jFTNhVgpvG7uWDs9beywKDoA/https/cdn.discordapp.com/attachments/549244834721038348/557057944001314826/dchclth-ff495fe4-6a33-4da7-afb7-1fe2d42d7041.png?width=471&height=471')
            .setDescription(t('commands:botinfo.description', {clientName: client.user.username, clientCreatedAt: moment.utc(client.user.createdAt).format('LLLL'), guildName: message.guild.name, clientUptime: moment.duration(client.uptime).format('D[d], H[h], m[m], s[s]'), clientGuildSize: Number(client.guilds.size).toLocaleString(), clientUserSize: Number(client.users.size).toLocaleString(), clientJoinedAt: moment.utc(message.guild.me.joinedAt).format('LLLL')}))
            .setFooter(t('commands:createdBy', {clientName: client.user.username, owner: client.users.get('395788326835322882').tag}), client.users.get('395788326835322882').displayAvatarURL)
            .addField(t('commands:botinfo.prefix'), server.prefix, true)
            .addField(t('commands:botinfo.website'), t('commands:botinfo.websiteDesc'), true)
            .addField(t('commands:botinfo.twitter'), '[@ChinoKafuuBot](https://twitter.com/ChinoKafuuBot)', true)
            .addField(t('commands:botinfo.serverSupport'), t('commands:botinfo.serverSupportDesc'), true)
    
            const statusEmbed = new client.Discord.RichEmbed()
            .setColor(color)
            .setTitle(t('commands:status.title'))
            .addField(t('commands:status.version'), `\`\`\`${require("../../../package.json").version}\`\`\``,true)
            .addField(t('commands:status.discord'), `\`\`\`${Discord.version}\`\`\``,true)
            .addField(t("commands:status.uptime"), `\`\`\`${duration}\`\`\``, true)
            .addField(t("commands:status.memory"), `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`\`\``, true)
            .addField(t("commands:status.cpuStatus"), `\`\`\`${percent.toFixed(2)}%\`\`\``, true)
            .addField(t("commands:status.system"), `\`\`\`${os.platform()} ${os.arch()}\`\`\``, true)
            .addField(t("commands:status.cpu"), `\`\`\`${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
    
            switch (args[0]) {
                case 'extended':
                    message.channel.send(statusEmbed)
                    break;
                default:
                message.channel.send(embed).then(msg => {
                    msg.react('574337895838777374')
    
                    const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "chino_chibi" && (u.id !== client.user.id && u.id === message.author.id)))
                    collector.on('collect', r => {
                        r.remove(message.author.id)
                        switch (r.emoji.name) {
                            case 'chino_chibi':
                                msg.edit(statusEmbed)
                        }
                    })
                })
            }
        })
    }
}
