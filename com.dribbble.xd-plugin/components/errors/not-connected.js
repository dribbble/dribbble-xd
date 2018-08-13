const Component = require('../../library/component')

module.exports = new Component({
  header: require('../header/header'),
  footer: require('../common/close-footer'),
  message: require('../common/message'),

  alert() {
    return `Whoops! It looks like you’re not connected to the internet.`
  },

  content() {
    return `
      <div load="header"></div>
      <div load="message" receives="alert"></div>
      <div load="footer" passargs></div>
    `
  }
})
