

module.exports = class ButtonEvent {
    constructor(button) {
        this.customID = button.customID
        this.componentType = button.component_type
    }
}