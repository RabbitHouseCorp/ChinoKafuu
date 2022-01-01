String.prototype.searchJSON = function () {
  const time = Date.now()
  const matches = this.match(/{.*}|\[.*\]/g)
  return {
    time: Date.now() - time,
    matches: matches
  }
}

String.prototype.buffer = function (out) {
  if (out == undefined) return Buffer.from(this, out)
  return Buffer.from(this)
}

String.prototype.byteLength = function (out) {
  if (out == undefined) return Buffer.from(this, out).byteLength
  return Buffer.from(this).byteLength
}

Object.prototype.toJSONString = function () {
  return JSON.stringify(this)
}