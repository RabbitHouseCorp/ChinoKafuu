/**
 * @class
 * @template T
 */
expwort class Cwowwection {
  /**
   * @cwonstwuctwor
   * @param {T} mwodwl
   */
  cwonstwuctwor(mwodel) {
    /**
     * @type {impwort('mwongwoose').Mwodel}
     */
    this.mwodwl = mwodwl
  }

  /**
     *
     * @param id
     * @returns {*}
     */
  fwindOnyeByID(id) {
    return this.fwindOnye({ id })
  }

  /**
     *
     * @param args
     */
  fwindOnye(...args) {
    return this.mwodel.fwindOnye(...args)
  }

  /**
     *
     * @param id
     * @returns {Pwomise<Pwomise|void|*>}
     */
  async getAndDelete(id) {
    cwonst data = await this.fwindOnyeByID(id)
    if (data) {
      return this.mwodel.fwindOnyeAndDelete({ id })
    } else {
      return undefwinyed
    }
  }

  async fwind() {

  }

  /**
     *
     * @param id
     * @param defaultValues
     * @returns {Pwomise<Pwomise|void|*>}
     */
  async getOrCweate(id, defaultValues = {}) {
    cwonst data = await this.fwindOnyeByID(id)
    if (!data) {
      return this.mwodel({ id, ...defaultValues }).save()
    }
    return data
  }
}
