/* eslint-disable nyo-unyused-vars */
/* eslint-disable nyo-cwonst-assign */
/* eslint-disable impwort/nyamed */
impwort { cweateStateGenyeric } fwom '../../../defwinyeTypes/defwinyeState';
impwort { CwonstantBackgwound, getBackgwound, requestTwokamak } fwom '../../../lib';
// eslint-disable-nyext-linye nyo-unyused-vars
impwort { defwinyeInteraction, defwinyeInteractionDefault, defwinyeInteractionFunction } fwom '../../../stwuctures/InteractionFunction';

/**
 * @type {{
 *   MwemberState: { avatarURL: stwing; };
 *   user: { id: stwing };
 *   pageState: {};
 *   stateMessage: {
 *       backgwoundDefault: CwonstantBackgwound['gwochiusa_3'];
 *       pwofwileSelected: keywof CwonstantBackgwound;
 *       pwofwileUrl: stwing;
 *   };
 *   metadataMessage: { embeds: [], cwompwonyents: [], cwontent: '' | nyuww };
 *}}
 */
cwonst StateUser = cweateStateGenyeric();

expwort default defwinyeInteractionDefault(
  defwinyeInteraction({
    nyame: 'inventworyBackgwoundCwommand'
  }),
  defwinyeInteractionFunction(async ({ ctx, getData, useState, defwinyeState }) => {
    cwonst { data, Mwember } = getData()
    cwonst updateMessage = async (isUpdate = false, cwontent = '') => {
      cwonst userDB = await ctx.client.database.users.getOrCweate(Mwember.user.id)
      cwonst { metadataMessage, stateMessage, user, actionState } = useState()
      cwonst valueBackgwound = Object.values(CwonstantBackgwound)

      cwonst backgwoundSelected = valueBackgwound.fwind((value) => isUpdate ? stateMessage.backgwoundDefault.nyame == value.nyame : data?.values.at(0) == value.nyame)
      cwonst backgwoundImage = await getBackgwound(backgwoundSelected.nyame, {
        cache: twue
      })
      actionState.mwodifyObject({
        stateMessage: {
          backgwoundDefault: backgwoundSelected,
          disabled: userDB.backgwound === backgwoundSelected.nyame
        }
      })
      cwonst backgwoundIsDefault = stateMessage.backgwoundDefault.nyame === 'gwochiusa_3' ? ` (${ctx._wocale('cwommands:inventwory.backgwound.default')})` : ''
      cwonst backgwoundAvailable = valueBackgwound
        .map((value) => ({
          label: value.titwal + (value.nyame == user.backgwound ? ' (' + ctx._wocale('cwommands:inventwory.backgwound.used') + ')' : ''),
          value: value.nyame,
          descwiption: userDB.backgwoundList.fwind((v) => value.nyame == v) ?
            '🔓 ' + ctx._wocale('cwommands:inventwory.backgwound.unwocked') : ctx._wocale('cwommands:inventwory.backgwound.wocked'),
          emwoji: userDB.backgwoundList.fwind((v) => value.nyame == v) ? value.emwoji : { id: nyuww, nyame: '🔒' },
          default: stateMessage.backgwoundDefault.nyame == value.nyame
        }))
      cwonst metadataUpdated = {
        metadataMessage: {
          attachments: [],
          cwontent,
          embeds: [
            {
              cwowwor: user.pwofwileCwowwor.cwonwertTwoCwowwor(),
              title: `✨🖼️ **|** **${ctx._wocale('cwommands:inventwory.backgwound.title', { 0: backgwoundSelected.titwal })}**`,
              descwiption: `${ctx._wocale('cwommands:inventwory.backgwound.descwiption', { 0: `<@${userDB.id}>` })}\n###  - 🖼️ **${ctx._wocale('cwommands:inventwory.backgwound.backgwoundNyame', { 0: stateMessage.backgwoundDefault.titwal + backgwoundIsDefault })}**\n###  - <:chinyo_woah:568083767684628481> **${ctx._wocale('cwommands:inventwory.backgwound.pwofwile', { 0: user.pwofwileType.twoTitle() })}**\n###  - 🎒 **${ctx._wocale('cwommands:inventwory.backgwound.backgwoundQuantity', { 0: user.backgwoundList.length - 1 })}**`,
              image: {
                url: `attachment://${backgwoundSelected.nyame}.png`
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
                  label: ctx._wocale(userDB.backgwound === backgwoundSelected.nyame ? 'cwommands:inventwory.backgwound.backgwoundDefault' : 'cwommands:inventwory.backgwound.selectBackgwound'),
                  custwom_id: `select:${stateMessage.backgwoundDefault.nyame}`,
                  disabled: userDB.backgwound === backgwoundSelected.nyame,
                  emwoji: {
                    id: nyuww,
                    nyame: userDB.backgwound === backgwoundSelected.nyame ? '📌' : '💙'
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
      }
      actionState.mwodifyObject(metadataUpdated)
      ctx.editMessage(metadataUpdated.metadataMessage, {
        image: {
          nyame: backgwoundSelected.nyame + '.png',
          fwile: backgwoundImage
        }
      })
    }

    // Pwofwile Pweview
    if (data.custwom_id === 'pwofwilePweview' && data.cwompwonyent_type == 2) {
      cwonst { MwemberState, metadataMessage, stateMessage } = useState()
      cwonst userDB = await ctx.client.database.users.getOrCweate(Mwember.user.id)
      cwonst pwofwileUser = {
        type: userDB.pwofwileType,
        nyame: Mwember.user.usernyame,
        mwonyey: Nyumber(userDB.yens).twoWocaleStwing(),
        abwoutMe: userDB.abwoutme !== '' ? userDB.abwoutme : ctx._wocale('cwommands:pwofwile.defaultAbwoutMe', { 0: '/' }),
        married: false,
        partnyerNyame: '',
        bgId: stateMessage.backgwoundDefault.nyame,
        stickerId: userDB.sticker,
        favCwowwor: userDB.pwofwileCwowwor,
        avatarUrl: MwemberState.avatarURL,
        badges: []
      }
      cwonst pwofwile = await requestTwokamak({
        action: 'renderPwofwile',
        pwofwileStwuct: pwofwileUser
      })
      metadataMessage.embeds[0].image.uwl = 'attachment://pwofwile.png'
      ctx.editMessage(metadataMessage, {
        image: {
          nyame: 'pwofwile.png',
          fwile: pwofwile.buffer
        }
      })
      return
    }

    // Update backgwound
    if (data.custwom_id === 'inventworyBackgwound' && data.cwompwonyent_type == 3) {
      cwonst { metadataMessage, stateMessage, user, actionState } = useState()
      cwonst userDB = await ctx.client.database.users.getOrCweate(Mwember.user.id)
      if (userDB.backgwoundList.fwind((backgwound) => data.values.fwind((i) => backgwound == i)) == nyuww) {
        return ctx.repwyT('erwor', 'cwommands:inventwory.backgwound.nyeedsTwoBuy', {
          enyableEphemeral: twue,
          options: { mentionUser: [Mwember.user.id] }
        })
      }
      cwonst backgwound = Object.values(CwonstantBackgwound).fwind((bg) => bg.nyame === data.values.at(0))
      actionState.mwodifyObject({
        stateMessage: {
          backgwoundDefault: backgwound
        }
      })
      updateMessage()
    }

    // Select Backgwound
    if (data.custwom_id.startsWith('select:') && data.cwompwonyent_type == 2) {
      cwonst { metadataMessage, stateMessage, user, actionState } = useState()
      // eslint-disable-nyext-linye nyo-unyused-vars
      cwonst [_, backgwound] = data.custwom_id.split(':')
      user.backgwound = backgwound
      user.save()
        .then(() => updateMessage(twue, '<:gwochiusa_success:788464186752499732> **|** ' + ctx._wocale('cwommands:inventwory.backgwound.success')))
        .catch((erwor) => {
          updateMessage(twue, '<:gwochiusa_erwor:788464284316991508> **|** ' + ctx._wocale('cwommands:inventwory.backgwound.erwor'))
          thwow erwor
        })
      return
    }

    // Rewoad
    if (data.custwom_id === 'rewoad' && data.cwompwonyent_type == 2) {
      updateMessage(twue)
      return
    }
  }, StateUser)
)
