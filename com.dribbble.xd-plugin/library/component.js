module.exports = class {
  constructor(config={}) {
    this.config = config
  }

  render(args={}) {
    this.args = args

    if (this.config.beforeRender != null) {
      this.config.beforeRender.call(this)
    }

    this._setupContent()
    this._findRefs()
    this._attachEvents()
    this._loadInnerComponents()

    if (this.config.onRender != null) {
      this.config.onRender.call(this)
    }

    return this._component
  }

  _setupContent() {
    const content = this.config.content
    const styles = this.config.styles

    let innerContent = ''

    if (typeof content === 'function') {
      innerContent = content.call(this)
    } else if (typeof content === 'string') {
      innerContent = content
    }

    if (styles != null) {
      let innerStyles = ''

      if (typeof styles === 'function') {
        innerStyles = styles.call(this)
      } else if (typeof styles === 'string') {
        innerStyles = styles
      }

      innerContent = `
        <style>${innerStyles}</style>
        ${innerContent}
      `
    }

    this._component = document.createElement('div')
    this._component.innerHTML = innerContent
  }

  _findRefs() {
    this.refs = []

    const refQuery = this._component.querySelectorAll('[ref]')

    Array.from(refQuery).forEach((el) => {
      const refName = el.getAttribute('ref')
      this.refs[refName] = el
    })
  }

  _attachEvents() {
    this.attachedEvents = []

    const availableEvents = [
      'click',
      'hover', 'blur',
      'mouseenter', 'mouseleave',
      'keyup', 'keydown', 'keypress',
      'change', 'input'
    ]

    Array.from(availableEvents).forEach((event) => {
      const eventQuery = this._component.querySelectorAll(`[${event}]`)

      Array.from(eventQuery).forEach((el) => {
        const fn = this.config[el.getAttribute(event)].bind(this)
        el.addEventListener(event, fn)

        // Track our attached events
        // TODO: unbind events when unmounting
        this.attachedEvents.push({
          el: el,
          event: event,
          fn: fn
        })
      })
    })
  }

  _loadInnerComponents() {
    const loadQuery = this._component.querySelectorAll('[load]')

    Array.from(loadQuery).forEach((el) => {
      const component = this.config[el.getAttribute('load')]
      let args = {}

      if (el.hasAttribute('passargs')) {
        args = Object.assign(args, this.args)
      }

      if (el.hasAttribute('receives')) {
        const adtlArgs = {}
        adtlArgs[el.getAttribute('receives')] = this.config[el.getAttribute('receives')].bind(this)
        args = Object.assign(args, adtlArgs)
      }

      el.parentNode.replaceChild(component.render(args), el)
    })
  }
}
