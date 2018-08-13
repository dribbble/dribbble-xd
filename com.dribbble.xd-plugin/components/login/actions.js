const uxp = require('uxp')
const Component = require('../../library/component')

module.exports = new Component({
  close() {
    this.args.dialog.close()
  },

  onRender() {
    // this.config.displayFooterActions.call(this)
  },

  styles() {
    return `
      #login-message {
        text-align: center;
        font-size: 16px;
        line-height: 5px; /* this doesn't seem right */
        color: #525252;
      }

      #signin-footer {
        margin-top: 15px;
        display: flex;
      }

      #signin-footer .footer-spacer {
        flex: 1 0 0;
      }

      #signin-footer button {
        margin: 0 5px;
      }

      #loading-container {
        position: relative;
        height: 60px;
      }

      #loading-inner {
        position: absolute;
        left: 50%;
        margin-left: -65px;
        display: flex;
        flex-direction: row;
        font-size: 14px;
        color: #444;
      }

      #loading-container img {
        width: 32px;
        height: 32px;
        flex: 0 0 32px;
        margin-top: -5px;
      }
    `
  },

  displayFooterActions() {
    this.refs.footerContainer.innerHTML = `
      <p id="login-message">To share your work from Adobe XD, please log in.</p>

      <footer id="signin-footer">
        <div class="footer-spacer"></div>
        <button click="close">Cancel</button>
        <button uxp-variant="cta">Log in to Dribbble</button>
        <div class="footer-spacer"></div>
      </footer>
    `

    this._attachEvents()
  },

  content() {
    return `
      <div ref="footerContainer">
        <div id="loading-container">
          <div id="loading-inner">
            <img src="images/processing.gif" />One moment…
          </div>
        </div>
      </div>
    `
  }
})
