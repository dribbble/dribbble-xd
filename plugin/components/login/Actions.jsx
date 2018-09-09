const React = require('react')
const _ = require('../../library/utils')
const uxp = require('uxp')

module.exports = class Actions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'login',
      sessionId: _.randomString()
    }
  }

  messages(status) {
    return ({
      login: 'To share your work from Adobe XD, please log in.',
      authing: 'Once authenticated in your browser, hit Okay.',
      authfail: 'We couldn’t get your auth token. Try again?',
      loading: 'One moment, we’re checking Dribbble...',
      error: 'Something went wrong. Want to try again?',
      success: 'You’re all set! Re-open this dialog to start sharing.'
    })[status]
  }

  dismissDialog() {
    this.props.dialog.close()
  }

  launchLogin() {
    const authUrl = `${_.config.siteUrl}/auth/plugin?state=${_.config.platformIdentifier}-${this.state.sessionId}`
    uxp.shell.openExternal(authUrl)

    this.setState({ status: 'authing' })
  }

  checkAuthedState() {
    this.setState({ status: 'loading' })

    const checkParams = _.serializeObject({
      code: this.state.sessionId,
      platform: _.config.platformIdentifier
    })

    const checkHeaders = {}
    if (STAGING_AUTH != null) {
      checkHeaders['Authorization'] = `Basic ${btoa(STAGING_AUTH)}`
    }

    _.retriableFetch(`${_.config.siteUrl}/auth/plugin/check?${checkParams}`, {
      method: 'GET',
      headers: checkHeaders,
    }).then((response) => {
      response.json().then((data) => {
        _.storage.set('authToken', data.token)
        this.setState({ status: 'success' })
      }).catch((error) => {
        this.setState({ status: 'authfail' })
      })
    }).catch((error) => {
      this.setState({ status: 'error' })
    })
  }

  render() {
    switch(this.state.status) {
    case 'loading':
      var activeButton = (
        <div className="loading-button">
          <img src="plugin/images/processing.gif" />
          <span>Waiting...</span>
        </div>
      )
      break
    case 'authing':
    case 'authfail':
      var activeButton = (
        <button onClick={this.checkAuthedState.bind(this)} uxp-variant="cta">Okay</button>
      )
      break
    case 'error':
      var activeButton = (
        <button onClick={this.launchLogin.bind(this)} uxp-variant="cta">Try again</button>
      )
      break
    case 'login':
      var activeButton = (
        <button onClick={this.launchLogin.bind(this)} uxp-variant="cta">Login to Dribbble</button>
      )
      break
    }

    return (
      <div id="login-footer">
        <p className="message">{this.messages(this.state.status)}</p>

        <footer className="container">
          <div className="spacer"></div>
          { this.state.status === 'success' ? (
            <button onClick={this.dismissDialog.bind(this)} uxp-variant="cta">Okay</button>
          ) : (
            <div className="button-group">
              <button onClick={this.dismissDialog.bind(this)}>Cancel</button>
              {activeButton}
            </div>
          ) }
          <div className="spacer"></div>
        </footer>
      </div>
    )
  }
}
