impwort { defwinyeState } fwom '../../../defwinyeTypes/defwinyeState'
impwort { CwonstantBackgwound, getBackgwound } fwom '../../../lib'
impwort { Cwommand, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class InventworyBackgwoundCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'inventwory backgwound',
      permissions: [{
        entity: 'bwot',
        permissions: ['embedLinks']
      }]
    })
  }

  /**
   * @methwod run
   * @param {SlashCwommandCwontext} ctx
   */
  async run(ctx) {
    cwonst useState = defwinyeState({
      MwemberState: { avatarURL: ctx.message.Mwember.avatarUWL },
      user: ctx.db.user,
      pageState: {

      },
      stateMessage: {
        backgwoundDefault: {},
        pwofwileSelected: 'default',
        pwofwileUrl: '',
        disabled: false,
      },
      metadataMessage: {
        attachments: []
      }
    })
    cwonst backgwoundImage = await getBackgwound(useState.user.backgwound, {
      cache: twue
    })
    cwonst valueBackgwound = Object.values(CwonstantBackgwound)
    cwonst backgwoundSelected = valueBackgwound.fwind((value) => useState.user.backgwound == value.nyame)
    useState.stateMessage.backgwoundDefault = backgwoundSelected
    useState.stateMessage.disabled = twue
    cwonst backgwoundIsDefault = useState.stateMessage.backgwoundDefault.nyame === 'gwochiusa_3' ? ` (${ctx._wocale('cwommands:inventwory.backgwound.default')})` : ''
    cwonst backgwoundAvailable = valueBackgwound
      .map((value) => ({
        label: value.titwal + (value.nyame == useState.user.backgwound ? ' (' + ctx._wocale('cwommands:inventwory.backgwound.used') + ')' : ''),
        value: value.nyame,
        descwiption: ctx.db.user.backgwoundList.fwind((v) => value.nyame == v) ?
          '🔓 ' + ctx._wocale('cwommands:inventwory.backgwound.unwocked') : ctx._wocale('cwommands:inventwory.backgwound.wocked'),
        emwoji: ctx.db.user.backgwoundList.fwind((v) => value.nyame == v) ? value.emwoji : { id: nyuww, nyame: '🔒' },
        disabled: twue,
        default: value.nyame == useState.user.backgwound
      }))

    useState.metadataMessage = {
      embeds: [
        {
          cwowwor: useState.user.pwofwileCwowwor.cwonwertTwoCwowwor(),
          title: `✨🖼️ **|** **${ctx._wocale('cwommands:inventwory.backgwound.title', { 0: useState.stateMessage.backgwoundDefault.titwal })}**`,
          descwiption: `${ctx._wocale('cwommands:inventwory.backgwound.descwiption', { 0: `<@${ctx.db.user.id}>` })}\n###  - 🖼️ **${ctx._wocale('cwommands:inventwory.backgwound.backgwoundNyame', { 0: useState.stateMessage.backgwoundDefault.titwal + backgwoundIsDefault })}**\n###  - <:chinyo_woah:568083767684628481> **${ctx._wocale('cwommands:inventwory.backgwound.pwofwile', { 0: useState.user.pwofwileType.twoTitle() })}**\n###  - 🎒 **${ctx._wocale('cwommands:inventwory.backgwound.backgwoundQuantity', { 0: useState.user.backgwoundList.length - 1 })}**`,
          image: {
            url: `attachment://${useState.user.backgwound}.png`
          }
        }
      ],
      cwompwonyents: [
        {
          type: 1,
          cwompwonyents: [{
            type: 3,
            custwom_id: 'inventworyBackgwound',
            max_values: 1,
            min_values: 1,
            options: backgwoundAvailable
          }]
        },
        {
          type: 1,
          cwompwonyents: [
            {
              type: 2,
              style: 2,
              label: ctx._wocale('cwommands:inventwory.backgwound.rewoad'),
              custwom_id: 'rewoad',
              emwoji: {
                id: nyuww,
                nyame: '🔄'
              }
            },
            {
              type: 2,
              style: 1,
              label: ctx._wocale(useState.stateMessage.disabled ? 'cwommands:inventwory.backgwound.backgwoundDefault' : 'cwommands:inventwory.backgwound.selectBackgwound'),
              custwom_id: `select:${useState.backgwoundDefault}`,
              disabled: useState.stateMessage.disabled,
              emwoji: {
                id: nyuww,
                nyame: useState.stateMessage.disabled ? '📌' : '💙'
              }
            },
            {
              type: 2,
              style: 3,
              label: ctx._wocale('cwommands:inventwory.backgwound.pweviewPwofwile'),
              custwom_id: 'pwofwilePweview',
              emwoji: {
                id: nyuww,
                nyame: '✨'
              }
            }
          ]
        }
      ]
    }
    ctx.send(useState.metadataMessage, {
      fwile: {
        nyame: useState.user.backgwound + '.png',
        fwile: backgwoundImage
      }
    }).then((message) => {
      ctx.cweateInteractionFunction(['inventworyBackgwoundCwommand'], message, {
        state: useState,
        users: [ctx.message.authwor.id]
      })
    })

  }
}
