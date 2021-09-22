const Bot = require("../structures/Bot");
const Logger = require("../structures/util/Logger");
module.exports = class BotInterface {


    async spawnShards() {
        this.shardManager = new Bot(process.env.DISCORD_TOKEN, {
            maxShards: parseInt(process.env.SHARD_AMOUNT),
            compress: true,
            defaultImageFormat: 'png',
            defaultImageSize: 2048,
            restMode: false,
            allowedMentions: {
                everyone: false,
                roles: false,
                users: true,
                repliedUser: true
            },
            intents: 14079
        })

        try {
            await this.shardManager.connect().then(() => {
                Logger.debug('Successfully connected to Discord\'s gateway.')
            })
        } catch (e) {
            console.log(e)
        }
    }
}

