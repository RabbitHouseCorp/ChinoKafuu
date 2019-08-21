const Command = require("../../structures/command")
const Discord = require('discord.js');
const moment = require('moment');
require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
module.exports = class StatusCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            category: 'random',
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
       })
    } 
    execute({message, args, server}, t) {
        
        const duration = moment.duration(this.client.uptime).format(" dd[d] hh[h] mm[m] ss[s]");
        moment.locale(server.lang);
        cpuStat.usagePercent(function(err, percent, seconds) {
            if (err) return console.log(err);
            let embed = new this.client.Discord.RichEmbed()
            .setColor(this.client.colors.default)
            .setTitle(t('commands:status.title'))
            .addField(t('commands:status.version'), `\`\`\`${require('../../package.json').version}\`\`\``,true)
            .addField(t('commands:status.discord'), `\`\`\`${Discord.version}\`\`\``,true)
            .addField(t("commands:status.uptime"), `\`\`\`${duration}\`\`\``, true)
            .addField(t("commands:status.memory"), `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`\`\``, true)
            .addField(t("commands:status.cpuStatus"), `\`\`\`${percent.toFixed(2)}%\`\`\``, true)
            .addField(t("commands:status.system"), `\`\`\`${os.platform()} ${os.arch()}\`\`\``, true)
            .addField(t("commands:status.cpu"), `\`\`\`${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
    
            message.channel.send(embed)
        })
    }
}