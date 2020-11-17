const Listener = require('../structures/events/Listener')
const Logger = require('../structures/util/Logger')

module.exports = class ReadyListener extends Listener {
	constructor() {
		super()

		this.event = 'ready'
	}

	on(client) {
		const game = [
			{
				name: 'Tokimeki Poporon',
				type: 2
			},
			{
				name: 'Daydream café',
				type: 2
			},
			{
				name: 'Gochuumon wa Usagi Desu Ka?',
				type: 3
			},
			{
				name: 'Okaeri to Rabbit House Coffee.',
				type: 0
			},
			{
				name: '🐦 Follow me in twitter: @ChinoKafuuBot',
				type: 0
			},
			{
				name: 'Gochuumon wa Usagi Desu Ka? BLOOM',
				type: 3
			},
			{
				name: `If you need support, use ${process.env.BOT_PREFIX}help`,
				type: 1,
				url: 'https://twitch.tv/danielagc'
			},
			{
				name: 'Drink a tea on Fleur de Lapin',
				type: 1,
				url: 'https://twitch.tv/danielagc'
			},
			{
				name: 'Lapin The Phantom Thief',
				type: 3
			}
		]

		setInterval(() => {
			const status = Math.floor(Math.random() * game.length)
			client.editStatus('dnd', game[status])
		}, 5000)
		Logger.info(`Logged as ${client.user.username}#${client.user.discriminator}`)
		Logger.info(`Shards from ${client.clusters.firstShardID} - ${Number(client.clusters.firstShardID) + Number(process.env.SHARDS_PER_CLUSTER)} are online.`)
	}
}
