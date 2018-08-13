const Component = require('../../library/component')

module.exports = new Component({
  close() {
    this.args.dialog.close()
  },

  styles() {
    return `
      #close-footer {
        margin-top: 35px;
        display: flex;
        flex-direction: row;
      }

      #close-footer #footer-spacer {
        flex: 1 0 0;
      }
    `
  },

  content() {
    return `
      <footer id="close-footer">
        <div id="footer-spacer"></div>
        <button uxp-variant="cta" click="close">Okay</button>
      </footer>
    `
  }
})
