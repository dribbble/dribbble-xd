module.exports = class {
  constructor() {
    this.eventHandlers = {}

    this.el = document.createElement('dialog')
    document.body.appendChild(this.el)

    this.el.addEventListener('close', () => {
      if (this.eventHandlers.close) {
        this.eventHandlers.close.call(this)
      }
    })
  }

  open() {
    const eventHandler = this.eventHandlers.open
    if (eventHandler) {
      eventHandler.call(this)
    }

    return this.el.showModal()
  }

  close() {
    this.el.close()
  }

  on(eventName, callback) {
    this.eventHandlers[eventName] = callback
  }
}
