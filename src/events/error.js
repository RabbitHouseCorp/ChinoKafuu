module.exports = class Error {
	constructor(client) {
		this.client = client
	}

	run(err) {
		console.log(err.stack)
	}
}