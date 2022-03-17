const NightlyInteraction = require('../../../structures/nightly/NightlyInteraction')
const { Command } = require('../../../structures/util')
const { profileInfo } = require('../../../structures/util/Constants')
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

module.exports = class ShopProfileCommand extends Command {
  constructor() {
    super({
      name: 'shop profile',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    let readyForBuy = false
    const _id = Math.floor(Math.random() * 1000000000000000)
    const profileLoaded = new Map()
    const loadList = []
    const arrayBadges = [
      /**
             * This is a badge list.
             */
    ]

    for (const flag of flags) {
      switch ((flag.flag & ctx.message.member?.user?.publicFlags ?? ctx.message.member.publicFlags) === flag.flag) {
        case true:
          arrayBadges.push(flag.name)
          break
      }
    }
    for (const profile of profileInfo) {
      let disabled = false
      if (profile.readyForSale === false && profile.disabled) {
        disabled = true
      }
      if (!profile.disabled) {
        loadList.push({
          'label': profile.name,
          'value': profile._id,
          'description': profile.shotDescription ?? 'No description',
          'disabled': true,
          'default': disabled
        })
      }
    }
    const component = {
      type: 1,
      components: [
        {
          type: 3,
          custom_id: `${_id}`,
          max_values: 1,
          min_values: 1,
          options: loadList,
          disabled: false
        }
      ]
    }
    let messageData = {}
    ctx.send({
      content: 'Hi! Welcome to the decorative profile shop. You can select one of these profiles to view the profile. Remembering if some do not appear green button to buy it means that you already have the profile purchased in your account!',
      components: [component]
    }).then((msgInteraction) => {
      const nightly = new NightlyInteraction(msgInteraction)
      let profileSelected = ''
      const functionNightly = async (interaction) => {
        const messagePrepared = async (position, selected) => {
          profileSelected = selected
          const user = await ctx.client.database.users.getOrCreate(ctx.message.author.id)
          const guildMember = await ctx.getMember(user.id) ?? undefined
          const couple = user.isMarry ? await ctx.getUser(user.marryWith) : { username: '', discriminator: '' }
          const data = {
            type: selected,
            name: ctx.message.author.username,
            money: Number(user.yens).toLocaleString(),
            aboutMe: user.aboutme !== '' ? user.aboutme : ctx._locale('commands:profile.defaultAboutMe', { 0: ctx.db.guild.prefix }),
            married: user.isMarry,
            partnerName: `${couple?.username}#${couple.discriminator}`,
            bgId: user.background,
            stickerId: user.sticker,
            favColor: user.profileColor,
            avatarUrl: guildMember?.guildAvatar ?? ctx.message.author.avatarURL,
            badges: arrayBadges
          }

          component.components[0].disabled = true
          await nightly.sendAck('update', {
            content: 'Loading profile preview please wait a while.',
            components: [component]
          }).then(async () => {
            let disabled = false
            let disabledReason = ''
            let positionProfile = -1
            for (const a of profileInfo) {
              positionProfile++;
              if (profileSelected === a._id) {
                if ((a.flag & (user.profiles ?? 0)) === a.flag) {
                  disabledReason = '**You already have this profile**!'
                  disabled = true
                  break
                }
                break
              }
            }

            if (!(user.yens > profileInfo[positionProfile].price - 1) || user.yens <= 0) {
              disabledReason = 'The button is disabled for this reason -> Your account\'s yen value is negative or there is not enough price to buy this profile.'
              disabled = true
            }
            const resultFinal = [
              component,
              {
                type: 1,
                components: [{
                  type: 2,
                  style: 3,
                  label: 'Buy',
                  custom_id: profileInfo[position].buttonId,
                  disabled: disabled
                }]
              }
            ]
            component.components[0].disabled = false
            if (profileLoaded.get(profileSelected) !== undefined) {
              const dataProfile = profileLoaded.get(profileSelected)
              messageData = { content: 'Preview ready!' + `${disabledReason === '' ? '' : `\n**Warning**: ${disabledReason}\n**Yens**: \`${user.yens.toLocaleString()}\``}`, embeds: dataProfile.embeds, attachments: [], components: resultFinal }
              await msgInteraction.edit(messageData, dataProfile.image)
              return;
            }
            const dataProfile = await this.generateProfile(data.type, data)
            messageData = { content: 'Preview ready!' + `${disabledReason === '' ? '' : `\n**Warning**: ${disabledReason}\nYens: \`${user.yens.toLocaleString()}\``}`, embeds: dataProfile.embeds, attachments: [], components: resultFinal }
            profileLoaded.set(profileSelected, dataProfile)
            await msgInteraction.edit(messageData, dataProfile.image)
          })
        }
        switch (interaction.data.values[0]) {
          case 'modern': {
            messagePrepared(1, interaction.data.values[0])
          }
            break;
          case 'profile_2': {
            messagePrepared(2, interaction.data.values[0])
          }
            break;
          default:
            nightly.sendAck('update', {
              content: 'This profile you selected is not available. Will be added soon. Join the RabbitHouse server to stay up to date with new profiles.',
              components: [component],
              embeds: [],
              attachments: []
            })
        }
      }
      nightly.on('collect', async ({ interaction }) => {
        if (interaction.buttonEvent.member.id != ctx.message.member.id) return nightly.sendAck('respond', { content: 'Sorry you don\'t have this control for this interaction.', flags: 1 << 6 })

        switch (interaction.data.component_type) {
          case 2: {
            if (interaction.data.custom_id.startsWith('yes')) {
              readyForBuy = true
            }
            this.buy(interaction, nightly, ctx, msgInteraction, messageData, readyForBuy)
          }
            break;
          case 3: {
            functionNightly(interaction)
          }
            break;

        }
      })
    })
  }

  async buy(interaction, nightly, ctx, msgInteraction, messageData, readyForBuy) {
    if (interaction.data.custom_id.startsWith('no')) {
      await nightly.sendAck('update', {
        content: 'The purchase was successfully canceled!',
        embeds: [],
        components: [],
        attachments: [],
        flags: 0
      })
    }
    if (readyForBuy) {
      const user = ctx.db.user
      for (const a of profileInfo) {
        if (interaction.data.custom_id.replace('yes-', '') === a._id) {
          if ((a.flag & (user.profiles ?? 0)) === a.flag) {
            await nightly.sendAck('update', {
              content: 'You already own this profile!',
              embeds: [],
              components: [],
              attachments: [],
              flags: 0
            })
            return
          }
        }
      }
      let profileSelected = {}
      for (const i of profileInfo)
        if (i._id === interaction.data.custom_id.replace('yes-', '')) {
          profileSelected = i
          break
        }
      user.profiles = (user.profiles ?? 0) + profileSelected.flag
      user.yens -= profileSelected.price
      if (user.yens < 0) user.yens = 0
      user.save()
      await nightly.sendAck('update', {
        content: 'Thank you for buying! The profile is available in your inventory.',
        embeds: [],
        components: [],
        attachments: [],
        flags: 0
      })
      return
    }

    await msgInteraction.edit({
      content: 'Are you sure you want to buy this profile? If "Yes, I want to buy" click confirm, if not click "No"',
      embeds: [],
      attachments: [],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 3,
              label: 'Yes, I want to buy',
              custom_id: `yes-${interaction.data.custom_id}`,
              disabled: false
            },
            {
              type: 2,
              style: 4,
              label: 'No',
              custom_id: `no-${interaction.data.custom_id}`,
              disabled: false
            },

          ]
        }
      ],
      flags: 1 << 6
    })
  }

  async generateProfile(profile, data) {
    let getProfile = {}
    for (const i of profileInfo)
      if (i._id === profile) {
        getProfile = i
        break
      }
    return axios({
      url: 'http://127.0.0.1:1234/render/profile?w=600&h=400&type=thumb',
      method: 'post',
      data: data,
      responseType: 'arraybuffer'
    }).then(file => {
      const id = Math.floor(Math.random() * 10000000000)
      return {
        embeds: [{
          title: getProfile.name,
          description: `${getProfile.shotDescription ?? 'No description'}\n\n**Price**: \`${Number(getProfile.price).toLocaleString()}\``,
          color: 0x5865F2,
          image: {
            url: `attachment://profile-${id}.png`
          }
        }],
        image: {
          file: file.data,
          name: `profile-${id}.png`
        }
      }
    })
      .catch((err) => {
        console.log(err)
        return { description: `There was a problem communicating with the API` }
      })

  }
}
