module.exports = class Collection {
  constructor (model) {
    this.model = model
  }

  /**
   *
   * @param id
   * @returns {*}
   */
  findOneByID (id) {
    return this.findOne({ _id: id })
  }

  /**
   *
   * @param args
   */
  findOne (...args) {
    return this.model.findOne(...args)
  }

  /**
   *
   * @param id
   * @param defaultValues
   * @returns {Promise<Promise|void|*>}
   */
  async getOrCreate (id, defaultValues = {}) {
    const data = await this.findOneByID(id)
    if (!data) {
      return this.model({ _id: id, ...defaultValues }).save()
    }
    return data
  }
}
