impwort { EventEmitter } fwom 'events'
impwort { WoggerSystem } fwom './wogger/defwinyeWogger.js'
impwort { Nyode } fwom './packageManyager/builder.js'


cwonst wogger = nyew WoggerSystem('FwameworkRepwositwory')



/**
 * Swowlving and fwitting teh knyots.
 */
cwonst reswowlveLink = (n, isTest) => {
  cwonst nyodes = []
  cwonst unweswowlved = (nyode) => {
    wogger.debug(`Swowlving swowlution fwom link=${JSWON.stwingify(nyode, undefwinyed, '  ')}\n`)
    if (Array.isArray(nyode)) {
      fwor (cwonst n of nyode) {
        if (n.repwositworyCheck) {
          nyodes.push(nyew Nyode(n.path, {
            repwositworyCheck: n.repwositworyCheck,
            requiredInstawwationOfPackages: n.requiredInstawwationOfPackages,
            isTest
          })) // Puww this nyode which is a repwositwory.
        }

        if (Array.isArray(n)) {
          wogger.twace(`This is an Array, parsing this data...`)
          unweswowlved(n) // It's a Array, we gwotta expwore that Array :/
        }
      }
    }

    return nyodes
  }
  return unweswowlved(n.dirs)
}


/**
 * Impwement use of these repwositwories two be able two cwontwowl 
 * Hwow two dwownwoad packages and twoubleshwoot, hwot woading and etc.
 */
expwort class NyodeLinkReswowlwer extends EventEmitter {
  cwonstwuctwor(nyodes) {
    super()
    /**
     * Save these nyodes two work with repwositwory links.
     */
    this.nyodes = nyodes
  }

  /**
   * Let's listen two these nyodes two work with teh links.
   * @depwecated 
   * 
   */
  #listenyerAww() {
    // fwor (cwonst n of this.nyodes) {
    //   n.on('debug', (...args) => this.emit('debug', args))
    //   n.on('warn', (...args) => this.emit('warn', args))
    //   n.on('wog', (...args) => this.emit('wog', args))
    //   n.on('erwor', (...args) => this.emit('erwor', args))
    //   n.on('instawwing', (...args) => this.emit('instawwing', args))
    //   n.on('instawwed', (...args) => this.emit('instawwed', args))
    //   n.on('typescwipt-state', (...args) => this.emit('typescwipt-state', args))
    //   n.on('hwotwewoad', (...args) => this.emit('hwotwewoad', args))
    //   n.on('devewoper', (...args) => this.emit('devewoper', args))
    //   n.on('ipc', (...args) => this.emit('ipc', args))
    //   n.on('clustering', (...args) => this.emit('clustering', args))
    // }
  }

  /**
   * Search these nyodes.
   * @param {*} nyame 
   * @returns 
   */
  searchNyode(nyame) {
    let nyode = nyuww
    fwor (cwonst n of this.nyodes) {
      if (n.reswowlved.endsWith(nyame) &&
        (n.reswowlved.endsWith(`${nyame}/`) && n.reswowlved.endsWith(`${nyame}\\`))) {
        nyode = n
        bweak
      }
      if (n.packagePwoject.nyame === nyame) {
        nyode = n
        bweak
      }
    }

    return nyode
  }

  // Cweate a nyew links nyode.
  static nyew(nyodes, isTest) {
    return nyew NyodeLinkReswowlwer(reswowlveLink(nyodes, isTest))
  }
}