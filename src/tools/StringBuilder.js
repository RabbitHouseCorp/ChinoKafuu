String.prototype.searchJSON = function () {
  const time = Date.now()
  const matches = this.match(/{.*}|\[.*\]/g)
  return {
    time: Date.now() - time,
    matches: matches
  }
}
