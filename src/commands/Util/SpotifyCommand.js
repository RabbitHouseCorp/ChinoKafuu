const Command = require("../../structures/command")
module.exports = class SpotifyCommand extends Command {
    constructor(client) {
       	super(client, {
           	name: 'spotify',
           	category: 'util',
           	aliases: [],
           	UserPermission: null,
           	ClientPermission: null,
           	OnlyDevs: false,
           	hidden: false,
       	})
   	} 
   	run({message, args, server}, t) {
			
		let member = message.mentions.users.first() || this.client.users.get(args[0]) || message.author
		if (!member.presence.game) return message.chinoReply('error',t('commands:spotify.userNoListen', {author: message.author, member: member.username}))
		if (member.presence.game.name !== 'Spotify' && member.presence.game.type !== 2) return message.chinoReply('error', t('commands:spotify.userNoListen', {author: message.author, member: member.username}))

		let spotifyImg = member.presence.game.assets.largeImageURL;
		let spotifyUrl = `https://open.spotify.com/track/${member.presence.game.syncID}`;
		let spotifyName = member.presence.game.details;
		let spotifyAlbum = member.presence.game.assets.largeText;
		let spotifyAuthor = member.presence.game.state;

		let embed = new this.client.Discord.RichEmbed()

		.setAuthor(t('commands:spotify.userListening', {member: member.tag}), 'https://cdn.discordapp.com/emojis/554334875411415107.png?v=1')
		.setColor(this.client.colors.mine)
		.setThumbnail(spotifyImg)
		.setFooter(spotifyAlbum, spotifyImg)
		.addField(t('commands:spotify.name'), spotifyName)
		.addField(t('commands:spotify.author'), spotifyAuthor)
		.addField(t('commands:spotify.album'),spotifyAlbum)
		.addField(t('commands:spotify.url'), t('commands:spotify.inUrl', {spotifyUrl: spotifyUrl}))

		message.channel.send(embed)
	}
}