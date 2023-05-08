import { defineInteraction, defineInteractionDefault, defineInteractionFunction } from '../../structures/InteractionFunction'
import { Logger } from '../../structures/util'

export default defineInteractionDefault(
  defineInteraction({
    name: 'bankInteraction',
  }),
  defineInteractionFunction(async ({ useModal, editMessageT, _locale, defineState, getData }) => {
    const { data: dataInteraction } = getData()
    const type = dataInteraction?.custom_id === 'withDraw' ? ':withDraw' : ':transfer'
    const component = [{
      'type': 4,
      'custom_id': 'value',
      'label': _locale('commands:bank.interaction.value'),
      'style': 1,
      'min_length': 1,
      'max_length': 9,
      'placeholder': '',
      'required': true
    }]

    useModal(_locale('commands:bank.interaction.title'), async ({ data: interactionData, deleteModal }) => {
      deleteModal()
      const { data } = interactionData
      const [valueComponent] = data.components[0].components
      const count = parseInt(valueComponent.value.replace(/[^\d-]+/g, ''))
      let context = 'commands:bank.success.valueWasTransferred'

      if (isNaN(count)) return editMessageT('error', 'commands:bank.error.valueIsInvalid', {})
      if (count <= 0) return editMessageT('error', 'commands:bank.error.valueNotAcceptable', {})

      const state = defineState.user
      if (type === ':withDraw') {
        if (count > state.economy.bank) return editMessageT('error', 'commands:bank.error.rejectedBankWithdrawalValue', { 0: count.toLocaleString(), 1: state.economy.bank.toLocaleString() })
        context = 'commands:bank.success.valueWasWithdrawnFromBank'
        state.economy.value += Math.max(count, 0)
        state.economy.bank -= Math.max(count, 0)
      } else {
        if (count > state.economy.value) return editMessageT('error', 'commands:bank.error.rejectedValue', { 0: count.toLocaleString(), 1: state.economy.value.toLocaleString() })
        state.economy.value -= Math.max(count, 0)
        state.economy.bank += Math.max(count, 0)
      }

      await state.save().catch((err) => {
        Logger.error(`BankInteractionError: ${err}`)
        editMessageT('error', 'commands:bank.error.transactionWithError', {})
        throw err
      })
      await editMessageT('success', context, {
        0: count.toLocaleString(),
        1: state.economy.bank.toLocaleString(),
        2: state.economy.value.toLocaleString(),
      })
    }, [...component])
  })
)