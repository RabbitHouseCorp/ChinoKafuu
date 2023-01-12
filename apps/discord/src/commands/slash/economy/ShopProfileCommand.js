import axios from 'axios'
import { NightlyInteraction } from '../../../structures/nightly/NightlyInteraction'
import { Command, Logger } from '../../../structures/util'
import { profileInfo } from '../../../structures/util/Constants'

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

export default class ShopProfileCommand extends Command {
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
      content: ctx._locale('commands:shop.profile.welcomeToTheShop'),
      components: [component]
    }).then((msgInteraction) => {
      const nightly = new NightlyInteraction(msgInteraction, { time: 1 * 60000 })
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
            content: ctx._locale('commands:shop.profile.loadingPreview'),
            components: [component]
          }).then(async () => {
            try {
              let disabled = false
              let disabledReason = ''
              let positionProfile = -1
              // eslint-disable-next-line no-unused-vars
              for (const a of profileInfo) {
                positionProfile++;
                if (user.profileList.includes(selected)) {
                  disabledReason = ctx._locale('commands:shop.profile.alreadyHaveThisProfile')
                  disabled = true
                }
              }

              if (!(user.yens > profileInfo[typeof positionProfile === 'number' ? positionProfile : null].price - 1) || user.yens <= 0) {
                disabledReason = ctx._locale('commands:shop.profile.enoughYens')
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
                    custom_id: profileInfo[typeof position === 'number' ? position : null].buttonId,
                    disabled: disabled
                  }]
                }
              ]
              component.components[0].disabled = false
              if (profileLoaded.get(profileSelected) !== undefined) {
                const profileData = profileLoaded.get(profileSelected)
                messageData = {
                  content: `${disabledReason === '' ? '' : `${ctx._locale('commands:shop.buttonDisabled')} **${disabledReason}**\n**Yens**: \`${user.yens.toLocaleString()}\``}`,
                  embeds: profileData.embeds,
                  attachments: [],
                  components: resultFinal
                }
                await msgInteraction.edit(messageData, profileData.image)
                return;
              }
              const dataProfile = await this.generateProfile(data.type, data, ctx._locale)
              if (dataProfile === undefined) throw Error('ProfileTokamak: undefined')
              messageData = {
                content: `${disabledReason === '' ? '' : `${ctx._locale('commands:shop.buttonDisabled')} **${disabledReason}**\n**Yens**: \`${user.yens.toLocaleString()}\``}`,
                embeds: dataProfile.embeds,
                attachments: [],
                components: resultFinal
              }
              profileLoaded.set(profileSelected, dataProfile)
              await msgInteraction.edit(messageData, dataProfile.image)
            } catch (err) {
              Logger.error(err)
              component.components[0].disabled = false
              await msgInteraction.edit({
                content: ctx._locale('commands:shop.profile.problemFound'),
                components: [component]
              })
            }
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
              content: ctx._locale('commands:shop.profile.profileUnavailable'),
              components: [component],
              embeds: [],
              attachments: []
            })
        }
      }
      nightly.on('collect', async ({ interaction }) => {
        if (interaction.buttonEvent.member.id !== ctx.message.member.id) return nightly.sendAck('respond', { content: ctx._locale('commands:shop.notAllowed'), flags: 1 << 6 })

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
        content: ctx._locale('commands:shop.profile.purchaseCancelled'),
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
          if (user.profileList.includes(a._id)) {
            await nightly.sendAck('update', {
              content: ctx._locale('commands:shop.profile.alreadyHaveThisProfile'),
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
      user.profileList.push(profileSelected._id)
      user.yens -= profileSelected.price
      if (user.yens < 0) user.yens = 0
      user.save()
      await nightly.sendAck('update', {
        content: ctx._locale('commands:shop.profile.successfullyPurchased'),
        embeds: [],
        components: [],
        attachments: [],
        flags: 0
      })
      return
    }

    await msgInteraction.edit({
      content: ctx._locale('commands:shop.profile.youWantThisProfile', { 0: ctx._locale('commands:shop.yesIWant'), 1: ctx._locale('commands:shop.noIDont') }),
      embeds: [],
      attachments: [],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 3,
              label: ctx._locale('commands:shop.yesIWant'),
              custom_id: `yes-${interaction.data.custom_id}`,
              disabled: false
            },
            {
              type: 2,
              style: 4,
              label: ctx._locale('commands:shop.noIDont'),
              custom_id: `no-${interaction.data.custom_id}`,
              disabled: false
            },

          ]
        }
      ],
      flags: 1 << 6
    })
  }

  async generateProfile(profile, data, locale) {
    let getProfile = {}
    for (const i of profileInfo)
      if (i._id === profile) {
        getProfile = i
        break
      }
    return axios({
      url: `${process.env.TOKAMAK_URL}/render/profile?w=600&h=400&type=thumb`,
      method: 'post',
      data: data,
      responseType: 'arraybuffer'
    }).then(file => {
      const id = Math.floor(Math.random() * 10000000000)
      return {
        embeds: [{
          title: getProfile.name,
          description: `${getProfile.shotDescription ?? locale('commands:shop.noDescription')}\n\n**${locale('commands:shop.price')}**: \`${Number(getProfile.price).toLocaleString()}\``,
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
        throw Error('There was a problem communicating with the API')
      })

  }
}
