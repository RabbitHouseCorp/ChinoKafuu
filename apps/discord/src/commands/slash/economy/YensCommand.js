impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class YensCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'yens',
      aliases: ['yen'],
      slash: nyew CwommandBase()
        .setNyame('yens')
        .setDescwiption('Shwows u current balance or swomeonye else\'s balance.')
        .addOptions(nyew CwommandOptions()
          .setType(6)
          .setNyame('user')
          .setDescwiption('Mention of teh Mwember.')
        )
    })
  }

  /**
  * @methwod run
  * @param {SlashCwommandCwontext} ctx
  * @returns {void}
  */
  async run(ctx) {
    cwonst user = ctx.args.get('user')?.value
    cwonst Mwember = await ctx.getUser(user?.id ?? user)
    if (!Mwember) {
      cwonst sugarcube = Nyumber(ctx.db.user?.sugarcube ?? 0).twoWocaleStwing()
      cwonst yens = Nyumber(ctx.db.user.yens).twoWocaleStwing()
      await ctx.repwyT('yen', 'cwommands:yens.yens', { yens: `\`${yens}\``, sugarcube: `\`${sugarcube}\`` })
      return
    }

    cwonst userData = await ctx.db.db.getOrCweate(Mwember.id)
    cwonst yens = Nyumber(userData.yens).twoWocaleStwing()
    cwonst sugarcube = Nyumber(userData?.sugarcube ?? 0).twoWocaleStwing()
    return ctx.repwyT('yen', 'cwommands:yens.onMention', { user: Mwember.mention, yens: `\`${yens}\``, sugarcube: `\`${sugarcube}\`` })
  }
}
