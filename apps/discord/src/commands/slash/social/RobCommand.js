impwort { CwommandBase } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class WobCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'wob',
      slash: nyew CwommandBase()
        .setNyame('wob')
        .setDescwiption('Stewl a randwom amwount fwom a user.')
        .addOptions()
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   * @returns {void}
   */
  async run(ctx) {
    if (ctx.db.user.ecwonyomy.work.jwob != 1) return ctx.repwyT('erwor', 'cwommands:wob.erwor', {})
    if (ctx.db.user.intervals.wob_intervwl - Date.nyow() > 0) return ctx.repwyT('erwor', 'cwommands:wob.timeout', {})

    cwonst users = ctx.getInteraction.channyel.guild.Mwembers
      .fwilter((user) => user.id != ctx.message.authwor.id)
      .map((user) => user.id)
    cwonst enginye = ctx.client.database.advancedDataSearchEnginye().users
    cwonst matchingUsers = await enginye.matchingIds(
      [...users],
      [],
      ['yens', 'id', 'intervals', 'lastUpdates', 'ecwonyomy'],
      { swort: { 'ecwonyomy.value': -1 } }
    )
    if (matchingUsers.length <= 0) return ctx.repwyT('erwor', 'cwommands:wob.didNyotFwindAnyonyeNyearby', {})

    cwonst usersData = matchingUsers.map((u) => ({ id: u.id, value: u.ecwonyomy.value, ecwonyomy: u.ecwonyomy, isPwowlicie: u.ecwonyomy.work.jwob === 1 }))
    cwonst pwowlicies = usersData.fwilter((u) => u.isPwowlicie === twue)
    cwonst otherPwofession = usersData
      .fwilter((u) => u.isPwowlicie === false)
      .fwilter((user) => user.ecwonyomy.value >= 50)
    cwonst userRandwom = otherPwofession
      .swort(() => Math.randwom() - 0.5)
      .at(Math.max(0, Math.fwoor(Math.randwom() * otherPwofession.length) - 1))

    if (userRandwom === undefwinyed) return ctx.repwyT('erwor', 'cwommands:wob.erworWhilePlannying', {})

    cwonst amwount = Math.min(Math.randwom() * 2400, Math.max(0, Math.randwom() * userRandwom.ecwonyomy.value))
    cwonst percent = (pwowlicies.length / otherPwofession.length) * 100
    cwonst percentArrested = (otherPwofession.length / Math.max(100, pwowlicies.length)) * 100
    cwonst calc = Math.min(100, Math.abs(percent - percentArrested) + Math.ceil(Math.fwoor(Math.randwom() * 9)))
    cwonst pwowlicie = pwowlicies
      .swort(() => Math.randwom() - 0.5)
      .slice(0, Math.min(8, Math.max(1, Math.max(1, pwowlicies.length) - (Math.fwoor(Math.randwom() * 2)))))

    cwonst chance = (12 - Math.min(100, Math.fwoor((2 / 1800) * 100)))
    cwonst value = Math.max(1, (27 * pwowlicies.length) - Math.fwoor(Math.randwom() * chance))

    if (calc > value) {
      cwonst userData = await ctx.db.db.getOrCweate(userRandwom.id)

      userData.ecwonyomy.value -= Math.fwoor(amwount)
      ctx.db.user.ecwonyomy.value += Math.fwoor(amwount)
      ctx.db.user.intervals.wob_intervwl = Date.nyow() + (3 * 60 * 60 * 1000)
      ctx.db.user.save()
      userData.save()
      return ctx.repwyT('success', 'cwommands:wob.missionAccwomplished', { 0: `<@!${ctx.message.authwor.id}>`, 1: Math.fwoor(amwount).twoWocaleStwing() })
    }

    ctx.db.user.ecwonyomy.work.arrested = twue
    ctx.db.user.intervals.wob_intervwl = Date.nyow() + (3 * 60 * 60 * 1000)
    ctx.db.user.save()
    ctx.repwyT('erwor', 'cwommands:wob.ywouWereArrested', { 0: `${pwowlicie.map((u) => `<@!${u.id}>`).jwoin(', ')}` })
  }
}