const Command = require("../../structures/command")
const malScraper = require('mal-scraper');

module.exports = class AnimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anime',
            category: 'random',
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false,
        })
    } 
    execute({message, args, server}, t) {
        
        const search = args.join(' ')
        if (!search) return message.channel.send(t('commands:anime.args-null', {author: message.author, emoji: this.client.emotes.error}))
  
        malScraper.getInfoFromName(search).then((data) => {
            const embed = new this.client.Discord.RichEmbed()
            .setThumbnail(data.picture)
            .setColor(this.client.colors.default)
            .setTitle(t('commands:anime.sinopse'))
            .setDescription(data.synopsis)
            .addField(t('commands:anime.title'), data.englishTitle, true)
            .addField(t('commands:anime.type'), data.type, true)
            .addField(t('commands:anime.episode'), data.episodes, true)
            .addField(t('commands:anime.rating'), data.rating, true)
            .addField(t('commands:anime.StartAndEnd'), data.aired, true)
            .addField(t('commands:anime.score'), data.score, true)
            .addField(t('commands:anime.status'), data.scoreStats, true)
            .addField(t('commands:anime.duration'), data.duration, true)
            .addField(t('commands:anime.rank'), data.ranked, true)
            .addField(t('commands:anime.popularity'), data.popularity, true)
            .addField(t('commands:anime.genres'), `${data.genres.join(', ')}`, true)
    
            message.channel.send(embed)
        
        }).catch(() => {
            message.chinoReply('error', t('commands:anime.NotFound', {author: message.author, args: search}))
        })
    }
}