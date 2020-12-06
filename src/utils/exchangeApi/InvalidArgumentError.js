module.exports = class InvalidArgumentError extends Error{
    constructor(message) {
        super(message)
    }
}