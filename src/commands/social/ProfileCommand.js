const { Command } = require('../../utils')
const axios = require('axios')
module.exports = class ProfileCommand extends Command {
    constructor() {
        super({
            name: 'profile',
            aliases: ['perfil'],
            hasUsage: true
        })
    }

    async run(ctx) {
        let member = await ctx.getUser(ctx.args[0])
        if (!member) {
            member = ctx.message.author
        }

        let user = await ctx.client.database.users.getOrCreate(member.id)
        let couple = user.isMarry ? await ctx.getUser(user.marryWith) : { username: '', discriminator: '' }

        axios({
            url: 'http://127.0.0.1:1234/render/profile',
            method: 'post',
            data: {
                type: 'default',
                name: member.username,
                money: Number(user.yens).toLocaleString(),
                aboutMe: user.aboutme,
                married: user.isMarry,
                partnerName: `${couple?.username}#${couple.discriminator}`,
                bgId: user.background,
                stickerId: user.sticker,
                favColor: user.profileColor,
                avatarUrl: member.avatarURL
            },
            responseType: 'arraybuffer'
        }).then(jesus => {
            ctx.send('', {}, { file: jesus.data, name: 'profile.png' })
        })
    }
}
