const React = require('react')
const _ = require('../../library/utils')
const Header = require('../common/Header.jsx')
const Preview = require('./Preview.jsx')
const Form = require('./Form.jsx')
const AccountSelector = require('./AccountSelector.jsx')
const uxp = require('uxp')

module.exports = class ShareModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      headerType: 'share',
      status: 'loading',
      submitting: false,
      imageData: null,
      selectedAccount: null,
      shotUrl: null
    }
  }

  dismissDialog() {
    this.props.dialog.close()
  }

  openContact() {
    const authUrl = `${_.config.siteUrl}/contact`
    uxp.shell.openExternal(authUrl)
  }

  openShot() {
    const authUrl = this.state.shotUrl
    uxp.shell.openExternal(authUrl)
  }

  componentDidMount() {
    if (!this.props.user) {
      const requestHeaders = new Headers()
      requestHeaders.append('Authorization', `Bearer ${this.props.auth}`)

      // fetch(`${_.config.apiUrl}/user`, {
      //   method: 'GET',
      //   headers: requestHeaders
      // }).then((response) => {
      //   response.json().then((user) => {
      //     let userData = {
      //       id: user.id,
      //       name: user.name,
      //       login: user.login,
      //       pro: user.pro || false,
      //       avatar_url: user.avatar_url,
      //       teams: user.teams || {}
      //     }

      //     this.setState({ user: userData })
      //     _.storage.set('userDetails', user)
      //   }).catch((error) => {
      //     console.log(error)
      //   })
      // })

      const req = new XMLHttpRequest();
      req.onload = () => {
        if (req.status === 200) {
          try {
            let user = req.response
            let userData = {
              id: user.id,
              name: user.name,
              login: user.login,
              pro: user.pro || false,
              avatar_url: user.avatar_url,
              teams: user.teams || {}
            }

            this.setState({ user: userData })
            _.storage.set('userDetails', user)
          } catch (err) {
            console.log('catching error')
          }
        } else {
          console.log('request failed')
        }
      }
      req.onerror = console.log('errored');
      req.onabort = console.log('aborted');
      req.open('GET', `${_.config.apiUrl}/user`, true);
      req.setRequestHeader('Authorization', `Bearer ${this.props.auth}`);
      req.responseType = 'json';
      req.send();
    } else {
      this.setUpContents()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.status === 'loading') {
      this.setUpContents()
    }
  }

  setUpContents() {
    _.imageBase64FromNode(this.props.node).then((imageData) => {
      this.setState({
        status: 'ready',
        imageData: imageData
      })

      this.forceUpdate()
    })
  }

  submitShot() {
    this.setState({ submitting: true })

    const formData = new FormData(this.refs.shotForm.refs.shotForm)
    formData.append('image_data', `data:image/png;base64,${this.state.imageData}`)

    if (!this.refs.shotForm.refs.lowProfileCheckbox.checked) {
      formData.delete('low_profile')
    }

    const requestHeaders = new Headers()
    requestHeaders.append('Authorization', `Bearer ${this.props.auth}`)

    fetch(`${_.config.apiUrl}/shots`, {
      method: 'POST',
      headers: requestHeaders,
      body: formData
    }).then((response) => {
      // UNCOMMENT FOR SUCCESS PREVIEW
      // this.setState({
      //   headerType: 'success',
      //   status: 'success',
      //   shotUrl: `${_.config.siteUrl}/shots/test`
      // })
      // return

      if (response.status === 202) {
        const splitUrl = response.headers.get('location').split('/')

        this.setState({
          headerType: 'success',
          status: 'success',
          shotUrl: `${_.config.siteUrl}/shots/${splitUrl[splitUrl.length - 1]}`
        })
      } else {
        try {
          response.json().then((data) => {
            if (data.errors && data.errors[0].message.includes('daily limit')) {
              this.setState({
                headerType: 'error',
                status: 'limit'
              })
            } else {
              this.showError(data)
            }
          })
        } catch(error) {
          this.showError(error)
        }
      }
    }).catch(this.showError.bind(this))
  }

  showError(error) {
    console.log(error)

    this.setState({
      headerType: 'error',
      status: 'error'
    })
  }

  setTitleState(input) {
    const value = input.target ? input.target.value : input
    this.setState({
      title: value
    })
  }

  selectedAccountChanged(selectedAccount) {
    this.setState({
      selectedAccount: selectedAccount
    })
  }

  render() {
    const user = this.props.user || this.state.user

    switch(this.state.status)  {
    case 'loading':
      var view = (
        <div className={`loading-container ${_.platformWin ? 'is-windows' : ''}`}>
          <img className="loading-image" src="plugin/images/processing.gif" />
        </div>
      )
      break
    case 'success':
      var view = (
        <div id="share-results-container">
          <div className="body-container">
            <p className="shot-success">Your shot has been posted!</p>

            <Preview
              imageData={this.state.imageData}
              width={this.props.node.width}
              height={this.props.node.height}
            />
          </div>

          <footer id="close-footer">
            <div className="spacer"></div>
            <button onClick={this.openShot.bind(this)}>Open in Browser</button>
            <button uxp-variant="cta" onClick={this.dismissDialog.bind(this)}>Okay</button>
          </footer>
        </div>
      )
      break
    case 'error':
      var view = (
        <div id="share-results-container">
          <div className="body-container">
            <p>
              Something went wrong on our end. You might want to try again.
              If this issue continues please contact us.
            </p>
          </div>

          <footer id="close-footer">
            <div className="spacer"></div>
            <button onClick={this.openContact.bind(this)}>Contact Support</button>
            <button uxp-variant="cta" onClick={this.dismissDialog.bind(this)}>Okay</button>
          </footer>
        </div>
      )
      break
    case 'limit':
      var view = (
        <div id="share-results-container">
          <div className="body-container">
            <p>Sorry, you've reached your daily shot limit! Please try posting again tomorrow.</p>
          </div>

          <footer id="close-footer">
            <div className="spacer"></div>
            <button uxp-variant="cta" onClick={this.dismissDialog.bind(this)}>Okay</button>
          </footer>
        </div>
      )
      break
    case 'ready':
      var view = (
        <div className={`form-container ${_.platformWin ? 'is-windows' : ''}`}>
          <Form
            ref="shotForm"
            node={this.props.node}
            selectedAccount={this.state.selectedAccount}
            setTitleState={this.setTitleState.bind(this)}
            submitShot={this.submitShot.bind(this)}
            preview={(
            <Preview
              imageData={this.state.imageData}
              width={this.props.node.width}
              height={this.props.node.height}
            />
          )} />

          <footer>
            <AccountSelector user={user} selectedAccountChanged={this.selectedAccountChanged.bind(this)} />
            <div className="spacer"></div>
            <button onClick={this.dismissDialog.bind(this)} className="adtl">Cancel</button>
            { this.state.submitting ? (
              <div className="loading-button">
                <img src="plugin/images/processing.gif" />
                <span>Hold tight!</span>
              </div>
            ) : (
              <button onClick={this.submitShot.bind(this)} disabled={!this.state.title} uxp-variant="cta">Share to Dribbble</button>
            ) }
          </footer>
        </div>
      )
      break
    }

    return (
      <div id="share-sheet" ref="container">
        <Header type={this.state.headerType} dialog={this.props.dialog} />
        {view}
      </div>
    )
  }
}
