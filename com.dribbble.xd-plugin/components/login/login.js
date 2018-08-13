const Component = require('../../library/component')

module.exports = new Component({
  header: require('./header'),
  actions: require('./actions'),

  content() {
    return `
      <div load="header"></div>
      <div load="actions" passargs></header>
    `
  }
})
