const _ = require('../../library/utils')
const uxp = require('uxp')
const Component = require('../../library/component')

module.exports = new Component({
  close() {
    this.args.dialog.close()
  },

  login() {
    const authUrl = `${_.config.siteUrl}/auth/plugin?state=${_.config.platformIdentifier}-${this.sessionId}`
    uxp.shell.openExternal(authUrl)

    this.refs.footerContainer.innerHTML = this.config.loadingState()

    _.pollRequest({
      method: 'POST',
      url: `${_.config.siteUrl}/auth/plugin/check`,
      params: {
        code: this.sessionId,
        provider: _.config.platformIdentifier
      }
    }).then((request) => {
      if (request.status === 200) {
        var result = JSON.parse(request.responseText)
        // it worked!!!
      } else {
        this.config.displayActions('Something went wrong. Want to try again?')
      }
    }).catch((response) => {
      let message = ''

      if (response.state === 'quit') {
        message = 'Sorry, we that took too long. Try again?'
      } else if (response.state === 'error') {
        console.log(response.error)
        message = 'Something went wrong. Want to try again?'
      }

      this.config.displayActions.call(this, message)
    })
  },

  displayActions(message) {
    this.refs.footerContainer.innerHTML = this.config.loginActions(message)
    this._attachEvents()
  },

  beforeRender() {
    this.sessionId = _.randomString()
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
        height: 58px;
      }

      #loading-inner {
        position: absolute;
        left: 50%;
        margin-left: -45px;
        top: 17px;
        display: flex;
        flex-direction: row;
        font-size: 15px;
      }

      #loading-inner img {
        width: 32px;
        height: 32px;
        flex: 0 0 32px;
      }

      #loading-inner span {
        margin-top: 4px;
        color: #444;
      }
    `
  },

  loginActions(message) {
    return `
      <p id="login-message">${message}</p>

      <footer id="signin-footer">
        <div class="footer-spacer"></div>
        <button click="close">Cancel</button>
        <button click="login" uxp-variant="cta">Log in to Dribbble</button>
        <div class="footer-spacer"></div>
      </footer>
    `
  },

  loadingState() {
    return `
      <div id="loading-container" title="Please visit the page opened in your browser.">
        <div id="loading-inner">
          <img src="images/processing.gif" />
          <span>Waiting...</span>
        </div>
      </div>
    `
  },

  content() {
    return `
      <div ref="footerContainer">
        ${this.config.loginActions('To share your work from Adobe XD, please log in.')}
      </div>
    `
  }
})
