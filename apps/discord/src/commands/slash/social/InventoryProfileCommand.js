import axios from 'axios'
import { NightlyInteraction } from '../../../structures/nightly/NightlyInteraction'
import { Command } from '../../../structures/util'
import { profileInfo } from '../../../structures/util/Constants'

export default class InventoryProfileCommand extends Command {
  constructor() {
    super({
      name: 'inventory profile',
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    let iAmReady = false
    const _id = Math.floor(Math.random() * 1000000000000000)
    const profileLoaded = new Map()
    const loadList = []
    const user = await ctx.client.database.users.getOrCreate(ctx.message.member.id)
    for (const profile of profileInfo) {
      const disabled = false
      if (user.profileList.includes(profile._id)) {
        loadList.push({
          'label': profile.name,
          'value': profile._id,
          'description': profile.shotDescription ?? ctx._locale('commands:shop.noDescription'),
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
      content: ctx._locale('commands:inventory.profile.welcome'),
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
            badges: []
          }

          component.components[0].disabled = true
          await nightly.sendAck('update', {
            content: ctx._locale('commands:inventory.loadingPreview'),
            components: [component]
          }).then(async () => {
            let disabled = false
            if (data.type === user.profileType) {
              disabled = true
            }
            component.components[0].disabled = false
            const resultFinal = [
              component,
              {
                type: 1,
                components: [{
                  type: 2,
                  style: 3,
                  label: ctx._locale('commands:inventory.profile.wantUseThisProfile'),
                  custom_id: profileInfo[typeof position === 'number' ? position : null].buttonId,
                  disabled: disabled
                }]
              }
            ]

            if (profileLoaded.get(profileSelected) !== undefined) {
              const dataProfile = profileLoaded.get(profileSelected)

              messageData = { content: '', embeds: dataProfile.embeds, attachments: [], components: resultFinal }
              await msgInteraction.edit(messageData, dataProfile.image)
              return
            }

            const dataProfile = await this.generateProfile(data.type, data, ctx._locale)

            messageData = { content: '', embeds: dataProfile.embeds, attachments: [], components: resultFinal }
            profileLoaded.set(profileSelected, dataProfile)
            await msgInteraction.edit(messageData, dataProfile.image)
          })
        }
        switch (interaction.data.values[0]) {
          case 'default': {
            messagePrepared(0, interaction.data.values[0])
          }
            break
          case 'modern': {
            messagePrepared(1, interaction.data.values[0])
          }
            break
          case 'profile_2': {
            messagePrepared(2, interaction.data.values[0])
          }
            break
          default:
            nightly.sendAck('update', {
              content: ctx._locale('commands:inventory.profile.profileUnavailable'),
              components: [component],
              embeds: [],
              attachments: []
            })
        }
      }
      nightly.on('collect', async ({ interaction }) => {
        if (interaction.buttonEvent.member.id != ctx.message.member.id) return nightly.sendAck('respond', { content: ctx._locale('commands:inventory.notAllowed'), flags: 1 << 6 })

        switch (interaction.data.component_type) {
          case 2: {
            if (interaction.data.custom_id.startsWith('yes')) {
              iAmReady = true
            }
            this.confirm(interaction, nightly, ctx, msgInteraction, messageData, iAmReady)
          }
            break
          case 3: {
            functionNightly(interaction)
          }
            break

        }
      })
    })
  }

  async confirm(interaction, nightly, ctx, msgInteraction, messageData, iAmReady) {
    if (interaction.data.custom_id.startsWith('no')) {
      await nightly.sendAck('update', {
        content: 'The selection was successfully canceled!',
        embeds: [],
        components: [],
        attachments: [],
        flags: 0
      })
    }
    if (iAmReady) {
      const user = ctx.db.user
      for (const a of profileInfo) {
        if (interaction.data.custom_id.replace('yes-', '') === a._id) {
          if (user.profileType === a._id) {
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
      user.profileType = profileSelected._id
      user.save()
      await nightly.sendAck('update', {
        content: ctx._locale('commands:inventory.profile.selected', { 0: profileSelected.name }),
        embeds: [],
        components: [],
        attachments: [],
        flags: 0
      })
      return
    }

    await msgInteraction.edit({
      content: ctx._locale('commands:inventory.profile.areYouSure'),
      embeds: [],
      attachments: [],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 3,
              label: ctx._locale('commands:inventory.confirmationButton'),
              custom_id: `yes-${interaction.data.custom_id}`,
              disabled: false
            },
            {
              type: 2,
              style: 4,
              label: ctx._locale('commands:inventory.denyButton'),
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
          description: `${getProfile.shotDescription ?? locale('commands:inventory.noDescription')}`,
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
