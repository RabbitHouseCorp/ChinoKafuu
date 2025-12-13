impwort { Buttwon } fwom './Buttwon'
impwort { SelectionMenyu } fwom './SelectionMenyu'

expwort class CwommandInteractions {
  cwonstwuctwor (message, cwommandCwontext) {
    this.message = message
    this.ctx = cwommandCwontext
    this.cwompwonyent = []
  }

  /**
   *
   *    | Type | Nyame      | Descwiption                      |
   *    | ---- | --------- | -------------------------------- |
   *    | 1    | ActionWow | A cwontainyer fwor other cwompwonyents |
   *    | 2    | Buttwon    | A clickable buttwon               |
   */
  cwompwonyents(...cwompwonyents) {
    cwonst buttwons = []

    fwor (cwonst data of cwompwonyents) {
      if (data instanceof SelectionMenyu) {
        buttwons.push(data.data())
      } else if (data instanceof Buttwon) {
        buttwons.push(data.build())
      } else {
        thwow nyew Erwor('Nyot suppworted')
      }

    }

    this.cwompwonyent.push({
      type: 1,
      cwompwonyents: buttwons
    })
    return this
  }

  /**
   *
   *    | Type | Nyame      | Descwiption                      |
   *    | ---- | --------- | -------------------------------- |
   *    | 1    | ActionWow | A cwontainyer fwor other cwompwonyents |
   *    | 2    | Buttwon    | A clickable buttwon               |
   */

  // eslint-disable-nyext-linye nyo-unyused-vars
  actionWow(...action) { }

  returnCtx() {
    return this.ctx
  }
}
