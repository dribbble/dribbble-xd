const React = require('react')
const _ = require('../../library/utils')
const Header = require('../header/Header.jsx')
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

      fetch(`${_.config.apiUrl}/user`, {
        method: 'GET',
        headers: requestHeaders
      }).then((response) => {
        response.json().then((user) => {
          this.setState({ user: user })
          _.storage.set('userDetails', user)
        }).catch((error) => {
          console.log(error)
        })
      })
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
    const imageBlob = _.b64toBlob(this.state.imageData, 'image/png')
    formData.append('image', imageBlob, 'image.png')

    const requestHeaders = new Headers()
    requestHeaders.append('Authorization', `Bearer ${this.props.auth}`)

    fetch(`${_.config.apiUrl}/shots`, {
      method: 'POST',
      headers: requestHeaders,
      body: formData._blob()
    }).then((response) => {
      if (response.status === 202) {
        const splitUrl = response.headers.get('location').split('/')

        this.setState({
          headerType: 'success',
          status: 'success',
          shotUrl: `${_.config.siteUrl}/shots/${splitUrl[splitUrl.length - 1]}`
        })
      } else {
        this.setState({
          headerType: 'error',
          status: 'error'
        })
      }
    }).catch((err) => {
      console.log(err)

      this.setState({
        headerType: 'error',
        status: 'error'
      })
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
        <div className="loading-container">
          <img className="loading-image" src="plugin/images/processing.gif" />
        </div>
      )
      break
    case 'success':
      var view = (
        <div id="share-message">
          <p>Your shot has been posted.</p>

          <footer id="close-footer">
            <div className="spacer"></div>
            <button onClick={this.openShot.bind(this)}>Open Shot</button>
            <button uxp-variant="cta" onClick={this.dismissDialog.bind(this)}>Okay</button>
          </footer>
        </div>
      )
      break
    case 'error':
      var view = (
        <div id="share-message">
          <p>
            Something went wrong on our end. You might want to try again.
            If this issue continues please contact us.
          </p>

          <footer id="close-footer">
            <div className="spacer"></div>
            <button onClick={this.openContact.bind(this)}>Contact Support</button>
            <button uxp-variant="cta" onClick={this.dismissDialog.bind(this)}>Okay</button>
          </footer>
        </div>
      )
      break
    case 'ready':
      var view = (
        <div>
          <Form
            ref="shotForm"
            node={this.props.node}
            selectedAccount={this.state.selectedAccount}
            setTitleState={this.setTitleState.bind(this)}
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
        <Header type={this.state.headerType} />
        {view}
      </div>
    )
  }
}
