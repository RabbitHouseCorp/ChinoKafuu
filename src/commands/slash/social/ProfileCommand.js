const { Command } = require('../../../utils')
const axios = require('axios')
const { CommandOptions, CommandBase } = require('eris')

const flags = [
  {
    flag: 1 << 0,
    name: 'discord_employee'
  },
  {
    flag: 1 << 1,
    name: 'discord_partner'
  },
  {
    flag: 1 << 2,
    name: 'hypesquad_events'
  },
  {
    flag: 1 << 3,
    name: 'bug_hunter'
  },
  {
    flag: 1 << 6,
    name: 'hypesquad_bravery'
  },
  {
    flag: 1 << 7,
    name: 'hypesquad_brilliance'
  },
  {
    flag: 1 << 8,
    name: 'hypesquad_balance'
  },
  {
    flag: 1 << 9,
    name: 'early_supporter'
  },
  {
    flag: 1 << 12,
    name: 'null'
  },
  {
    flag: 1 << 14,
    name: 'bug_hunter'
  },
  {
    flag: 1 << 17,
    name: 'bot_developer'
  }

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
      }],
      slash: new CommandBase()
        .setName('profile')
        .setDescription('Shows your social profile or the social profile of someone.')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('Mention member on server.')
        )
    })
  }

  async run(ctx) {
    const user1 = ctx.message.command.interface.get('user')?.value
    const member = await ctx.getUser(user1?.id ?? user1, true)
    const user = await ctx.client.database.users.getOrCreate(member.id)
    const couple = user.isMarry ? await ctx.getUser(user.marryWith) : { username: '', discriminator: '' }

    const arrayBadges = [
      /**
             * This is a badge list.
             */
    ]

    for (const flag of flags) {
      switch ((flag.flag & member.publicFlags) === flag.flag) {
        case true:
          arrayBadges.push(flag.name)
          break
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
        avatarUrl: ctx.message.guild.members.get(member.id)?.guildAvatar ?? member.avatarURL,
        badges: arrayBadges
      },
      responseType: 'arraybuffer'
    }).then(profile => {
      ctx.send('', {
        file: {
          file: profile.data,
          name: 'profile.png'
        }
      })
    })
  }
}
