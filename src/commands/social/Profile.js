const { Command } = require('../../utils')
const axios = require('axios')

const flags = [
    {
        flag: 1 << 0,
        name: "discord_employee",
    },
    {
        flag: 1 << 1,
        name: "discord_partner",
    },
    {
        flag: 1 << 2,
        name: "hypesquad_events",
    },
    {
        flag: 1 << 3,
        name: "bug_hunter",
    },
    {
        flag: 1 << 6,
        name: "hypesquad_bravery",
    },
    {
        flag: 1 << 7,
        name: "hypesquad_brilliance",
    },
    {
        flag: 1 << 8,
        name: "hypesquad_balance",
    },
    {
        flag: 1 << 9,
        name: "early_supporter",
    },
    {
        flag: 1 << 12,
        name: "null",
    },
    {
        flag: 1 << 14,
        "name": "bug_hunter",
    },
    {
        flag: 1 << 17,
        "name": "bot_developer",
    },


]

module.exports = class ProfileCommand extends Command {
    constructor() {
        super({
            name: 'profile',
            aliases: ['perfil'],
            hasUsage: true,
            permissions: [{
                entity: 'bot',
                permissions: ['attachFiles']
            }]
        })
    }

    async run(ctx) {

        let member = await ctx.getUser(ctx.args[0], true)
        let user = await ctx.client.database.users.getOrCreate(member.id)
        let couple = user.isMarry ? await ctx.getUser(user.marryWith) : { username: '', discriminator: '' }

        const arrayBadges = [
            /**
             * This is a badge list.
             */
        ]


        for (let flag of flags) {
            switch ((flag.flag & member.publicFlags) === flag.flag) {
                case true:
                    arrayBadges.push(flag.name)
                    break;
                case false:
                /**
                 * @returns null
                 */
                default:
                /**
               * @returns null
               */
            }
        }



        axios({
            url: 'http://127.0.0.1:1234/render/profile',
            method: 'post',
            data: {
                type: user.profileType,
                name: member.username,
                money: Number(user.yens).toLocaleString(),
                aboutMe: user.aboutme !== 'default' ? user.aboutme : ctx._locale('commands:profile.defaultAboutMe', { 0: ctx.db.guild.prefix }),
                married: user.isMarry,
                partnerName: `${couple?.username}#${couple.discriminator}`,
                bgId: user.background,
                stickerId: user.sticker,
                favColor: user.profileColor,
                avatarUrl: member.dynamicAvatarURL('png', 2048),
                badges: arrayBadges
            },
            responseType: 'arraybuffer'
        }).then(profile => {
            ctx.send('', {}, { file: profile.data, name: 'profile.png' })
        })
    }

}
