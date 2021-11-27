const { Command, Logger } = require('../../../utils')
const axios = require('axios')

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
      }]
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0], true)
    const user = await ctx.client.database.users.getOrCreate(member.id)
    const couple = user.isMarry ? await ctx.getUser(user.marryWith) : { username: '', discriminator: '' }

    const arrayBadges = [
      /**
             * This is a badge list.
             */
    ]

    for (const flag of flags) {
      switch ((flag.flag & member.user?.publicFlags ?? member?.publicFlags) === flag.flag) {
        case true:
          arrayBadges.push(flag.name)
          break
        case false:
      }
    }
    const a = Date.now();
    const cache = ctx.client.pluginManager.pluginStore.get('cache_profile').classState
    const data = {
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
    }
    if (cache.check(member.id, cache, data)) {
      axios({
        url: 'http://127.0.0.1:1234/render/profile?w=600&h=600&type=thumb',
        method: 'post',
        data: data,
        responseType: 'arraybuffer'
      }).then(profile => {
        Logger.debug(`profile (${member.id}) request took ${Date.now() - a}ms to receive.`)
        cache.setCache(member.id, cache, data, profile.data)
        ctx.send('', {
          file: {
            file: profile.data,
            name: 'profile.png'
          }
        })
      })
    } else {
      ctx.send('', {
        file: {
          file: cache.$cacheStore.get(member.id),
          name: 'profile.png'
        }
      })
    }
  }
}
