const Listener = require('../../structures/events/Listener')

module.exports = class CommandError extends Listener {
  constructor() {
    super()
    this.event = 'rawWS'
    this.$guild = []
  }

  async on(client, packet) {

    if (packet.t !== 'INTERACTION_CREATE') return
    const json = packet.d
    if (json.guild_id !== undefined) {
      if (client.guilds.get(json.guild_id) === undefined) {
        const guild_query = await client.database.flux({
          search: {
            guilds: [{ fetch: { id: json.guild_id }, noFetchData: true }],
          },
        }).data.toMap().get(`guilds:${json.guild_id}`).data
        let locale = null
        if (guild_query.data.query.includes(json.guild_id)) {
          const guildData = guild_query.data.query
          locale = client.i18nRegistry.getT(guildData.lang)
        } else {
          locale = client.i18nRegistry.getT(null)
        }
        if (!this.$guild.includes(json.guild_id)) {
          this.$guild.push(json.guild_id)
        }
        await client.sendPingInteraction(json.id, json.token, false)
        client.createFollowUpMessage(json.application_id, json.token, {
          type: 4,
          embeds: [{
            description: locale('errors.commandFail')
          }]
        }, null)

        client.on('guildCreate', (guild) => {
          if (guild.id === json.guild_id) {
            if (this.$guild.includes(guild.id)) {
              client.createFollowUpMessage(json.application_id, json.token, {
                type: 4,
                embeds: [{
                  description: locale('success.guildAdded')
                }]
              }, null)
              this.$guild.splice(this.$guild.indexOf(json.guild_id), 1) // Delete
            }
          }
        })
        return
      }
    }
  }
}
