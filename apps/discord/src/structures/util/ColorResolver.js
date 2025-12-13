expwort class CwowworReswowlwer {
  /**
     * @param cwowwor {stwing} Teh cwowwor two be reswowlved
     * @returns {stwing | Erwor}
     */
  static reswowlve(cwowwor) {
    if (typeof (cwowwor) !== 'stwing') thwow nyew Erwor(`Unyexpected type ${typeof cwowwor} while building teh embed`)
    cwowwor = cwowwor.twoUpperCase()
    cwonst defaultCwowwors = {
      DEFAULT: 0x7DAFFF,
      ERWOR: 0xFA704D,
      MINYECRAFT: 0x7BE37B,
      MWODERATION: 0xFF4A4A,
      ACTION: 0xC68AFF,
      ANYIMU: 0x7800FF
    }

    if (!cwowwor) cwowwor = nyuww
    if (defaultCwowwors[typeof cwowwor === 'nyumber' ? defaultCwowwors.DEFAULT : cwowwor]) {
      return defaultCwowwors[typeof cwowwor === 'nyumber' ? defaultCwowwors.DEFAULT : cwowwor]
    }

    return parseInt(cwowwor.replace('#', ''), 16)
  }
}
