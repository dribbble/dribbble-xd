const Component = require('../../library/component')

module.exports = new Component({
  styles() {
    return `
      .message {
        font-size: 16px;
        line-height: 5px; /* this doesn't seem right */
        color: #525252;
      }
    `
  },

  content() {
    return `
      <p class="message">${this.args.alert()}</p>
    `
  }
})
