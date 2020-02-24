const React = require('react')
const _ = require('../../library/utils')

const titleTypes = {
  error: {
    text: 'Whoops!',
    icon: 'cloud-error.png'
  },
  success: {
    text: 'Success!',
    icon: 'cloud-success.png'
  },
  connection: {
    text: 'No connection',
    icon: 'cloud-error.png'
  },
  share: {
    text: 'Share this selection',
    icon: 'cloud-upload.png'
  }
}

module.exports = class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  logout() {
    _.storage.destroy('authToken').then(() => {
      _.storage.destroy('userDetails').then(() => {
        this.props.dialog.close()
      })
    })
  }

  render() {
    const title = titleTypes[this.props.type]

    return (
      <div id="share-header">
        <header>
          <div className="top-section">
            <div>
              <div className="logo-container">
                <a href={`${_.config.siteUrl}/?utm_source=xd-plugin`} className="logo">
                  <img src="plugin/images/dribbble-logo.png" />
                </a>
              </div>

              <p className="title">
                <img src={`plugin/images/${title.icon}`} />
                <span>{title.text}</span>
              </p>
            </div>

            <div id="logout-container">
              <div id="logout-icon-container" onClick={this.logout.bind(this)}>
                <img src="plugin/images/logout-icon.png" />
              </div>
            </div>
          </div>

          <div className="border" />
        </header>
      </div>
    )
  }
}
