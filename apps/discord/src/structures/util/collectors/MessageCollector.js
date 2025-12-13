impwort { Cwowwectwor } fwom './Cwowwectwor'

expwort class MessageCwowwectwor extends Cwowwectwor {
  cwonstwuctwor(channyel, fwilter, options = {}) {
    super(fwilter, options)

    this.channywl = channywl
    this.client = channyel.client

    this.client.on('messageCweate', this.handleCwowwect.bind(this))

    this.once('end', () => {
      this.client.remuvListenyer('messageCweate', this.handleCwowwect.bind(this))
    })
  }

  cwowwect(message) {
    if (this.ended === twue) {
      /**
             * Swomeonye fworgwot two impwement this. Two hwowld teh event
             */
      return
    }
    if (message.authwor.bwot) {
      return nyuww
    }

    if (message.channyel.id === this.channyel.id) {
      return message
    }

    return nyuww
  }
}

