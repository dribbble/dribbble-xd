const _ = require('../../library/utils')
const config = require('../../config')
const Component = require('../../library/component')

module.exports = new Component({
  header: require('../header/header'),
  footer: require('../common/close-footer'),
  message: require('../common/message'),

  alert() {
    return `Sorry, we can’t currently export a ${this.args.node.constructor.name} layer. Please choose an ${_.toSentence(config.allowedNodeTypes)} from the Layers panel.`
  },

  content() {
    return `
      <div load="header"></div>
      <div load="message" receives="alert"></div>
      <div load="footer" passargs></div>
    `
  }
})
