const { Constants } = require('eris')

module.exports = class ResultsMechanism {
  searchChannel_Interaction(search, interaction) {
    let channels = []

    for (const channelPosition of interaction.channel.guild.channels) {
      const channel = channelPosition[1]
      const p = search.split('')
      const y = channel.name.replace('-', '').split('')

      let confirm = 0
      let wrong = false

      for (const k of p) {
        const letter = y.indexOf(k)

        if (!wrong) {
          if (y[letter] === undefined) {
            wrong = true
            wrong++
          } else {
            confirm++
          }
        }
      }

      if (!wrong) {
        if (confirm > 0) {
          channels.push({
            type: 3,
            name: `${channel.name} - ${channel.id}`,
            value: channel.id
          })
        }
      }
      if (channel.name.replace('-', '') === search) {
        channels = []
        channels.push({
          type: 3,
          name: `${channel.name} - ${channel.id}`,
          value: channel.id
        })
        break
      }
      if (channel.id === search) {
        channels = []
        channels.push({
          type: 3,
          name: `${channel.name} - ${channel.id}`,
          value: channel.id
        })
        break
      }
    }
    if (channels.size === 0) {
      interaction.autoComplete.addOptions().callback()
    } else {
      interaction.autoComplete.addOptions(channels).callback()
    }
  }

  searchTextChannel_Interaction(search, interaction) {
    let channels = []

    for (const channelPosition of interaction.channel.guild.channels) {
      const channel = channelPosition[1]
      const p = search.split('')
      const y = channel.name.replace('-', '').split('')

      let confirm = 0
      let wrong = false

      for (const k of p) {
        const letter = y.indexOf(k)

        if (!wrong) {
          if (y[letter] === undefined) {
            wrong = true
            wrong++
          } else {
            confirm++
          }
        }
      }

      if (!wrong) {
        if (confirm > 0) {
          if (channel.type === Constants.ChannelTypes.GUILD_TEXT) {
            channels.push({
              type: 3,
              name: `${channel.name} - ${channel.id}`,
              value: channel.id
            })
          }
        }
      }
      if (channel.name.replace('-', '') === search) {
        if (channel.type === Constants.ChannelTypes.GUILD_TEXT) {
          channels = []
          channels.push({
            type: 3,
            name: `${channel.name} - ${channel.id}`,
            value: channel.id
          })
        }
        break
      }
      if (channel.id === search) {
        if (channel.type === Constants.ChannelTypes.GUILD_TEXT) {
          channels = []
          channels.push({
            type: 3,
            name: `${channel.name} - ${channel.id}`,
            value: channel.id
          })
        }
        break
      }
    }

    if (channels.size === 0) {
      interaction.autoComplete.addOptions().callback()
    } else {
      interaction.autoComplete.addOptions(channels).callback()
    }
  }

  searchVoiceChannel_Interaction(search, interaction) {
    let channels = []

    for (const channelPosition of interaction.channel.guild.channels) {
      const channel = channelPosition[1]
      const p = search.split('')
      const y = channel.name.replace('-', '').split('')

      let confirm = 0
      let wrong = false

      for (const k of p) {
        const letter = y.indexOf(k)

        if (!wrong) {
          if (y[letter] === undefined) {
            wrong = true
            wrong++
          } else {
            confirm++
          }
        }
      }

      if (!wrong) {
        if (confirm > 0) {
          if (channel.type === Constants.ChannelTypes.GUILD_VOICE) {
            channels.push({
              type: 3,
              name: `${channel.name} - ${channel.id}`,
              value: channel.id
            })
          }
        }
      }
      if (channel.name.replace('-', '') === search) {
        if (channel.type === Constants.ChannelTypes.GUILD_VOICE) {
          channels = []
          channels.push({
            type: 3,
            name: `${channel.name} - ${channel.id}`,
            value: channel.id
          })
        }
        break
      }
      if (channel.id === search) {
        if (channel.type === Constants.ChannelTypes.GUILD_VOICE) {

          channels = []
          channels.push({
            type: 3,
            name: `${channel.name} - ${channel.id}`,
            value: channel.id
          })
        }
        break
      }
    }

    if (channels.size === 0) {
      interaction.autoComplete.addOptions().callback()
    } else {
      interaction.autoComplete.addOptions(channels).callback()
    }
  }
}