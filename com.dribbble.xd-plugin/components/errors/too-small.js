const config = require('../../config')
const Component = require('../../library/component')

module.exports = new Component({
  header: require('../header/header'),
  footer: require('../common/close-footer'),
  message: require('../common/message'),

  alert() {
    return `Your selection is ${this.args.node.width}px × ${this.args.node.height}px, which is too small. Dribbble requires Shots to be at least ${config.dimensionReqs.width}px × ${config.dimensionReqs.height}px.`
  },

  content() {
    return `
      <div load="header"></div>
      <div load="message" receives="alert"></div>
      <div load="footer" passargs></div>
    `
  }
})
