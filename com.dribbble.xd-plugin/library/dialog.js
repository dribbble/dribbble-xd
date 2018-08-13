module.exports = class {
  constructor(config={}) {
    this.eventHandlers = {}

    this.el = document.createElement('dialog')
    document.body.appendChild(this.el)

    this.el.addEventListener('close', () => {
      if (this.eventHandlers.close) {
        this.eventHandlers.close.call(this)
      }
    })

    if (config.component != null) {
      this.setComponent(config.component)
    }
  }

  setComponent(component, args) {
    const combinedArgs = Object.assign(args, {
      dialog: this,
    })

    this.el.innerHTML = ''
    this.el.appendChild(component.render(combinedArgs))

    this.component = component
  }

  open() {
    this.el.showModal()

    const eventHandler = this.eventHandlers.open
    if (eventHandler) {
      eventHandler.call(this)
    }
  }

  close() {
    this.el.close()
  }

  on(eventName, callback) {
    this.eventHandlers[eventName] = callback
  }
}
