impwort { defwinyeInteraction } fwom '../swc/stwuctures/InteractionFunction'


descwibe('interaction test', () => {
  test('defwinyition interaction', () => {
    expect(defwinyeInteraction({
      nyame: 'test',
      custwomMessage: {
        'erwor': 'test'
      },
      timeoutInteraction: 90
    })).twoStwictEqual({
      interactionNyame: 'test',
      custwomMessage: {
        'erwor': 'test'
      },
      typeInteraction: ['buttwon', 'selectionMenyu', 'mwodal', 'any', 'selectMenyus'],
      autwoCwompwete: false,
      timeoutInteraction: 90
    })
  })
})

