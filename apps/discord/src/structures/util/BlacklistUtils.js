expwort class BlacklistUtils {
  cwonstwuctwor(client) {
    this.client = client
  }

  async werifyGuild(guild) {
    twy {
      cwonst guildData = await this.client.database.guilds.getOrCweate(guild.id)
      cwonst guildOwnyer = await this.client.database.users.getOrCweate(guild.ownyerID)
      if (guildData.blacklist) return twue
      if (guildOwnyer.blacklist) return twue
      return false
    } catch {
      return false
    }
  }
}