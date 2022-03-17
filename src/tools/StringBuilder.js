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

String.prototype.removePath = function () {
  const getPath = require.main.path.replace('//', '')
    .replace('\\\\', '')
    .replace('./', '/')
    .replace('.\\', '\\')
  const str = this
    .replace('\\\\', '\\')
    .replace('./', '/')
    .replace('.\\', '\\')
    .split('\n')
  const a = []
  for (const b of str) {
    a.push(
      b
        .replace(getPath, '')
        .replace(/\\/g, '/')
    )
  }
  return a.join('\n')

}

Object.prototype.toJSONString = function () {
  return JSON.stringify(this)
}