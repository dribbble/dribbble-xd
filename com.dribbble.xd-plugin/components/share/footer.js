const Component = require('../../library/component')

module.exports = new Component({
  close() {
    this.args.dialog.close()
  },

  submit() {
    this.args.submitTrigger()
  },

  styles() {
    return `
      #share-footer {
        margin-top: 35px;
        display: flex;
        flex-direction: row;
      }

      #share-footer button {
        margin-left: 10px;
      }

      #share-footer #footer-spacer {
        flex: 1 0 0;
      }
    `
  },

  content() {
    return `
      <footer id="share-footer">
        <div id="footer-spacer"></div>
        <button click="close">Cancel</button>
        <button click="submit" uxp-variant="cta">Share to Dribbble</button>
      </footer>
    `
  }
})
