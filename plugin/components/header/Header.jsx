const React = require('react')
const Dropdown = require('./Dropdown.jsx')

const titleTypes = {
  error: {
    text: 'Whoops!',
    icon: 'x-cloud.png'
  },
  success: {
    text: 'Success!',
    icon: 'check-cloud.png'
  },
  connection: {
    text: 'No connection',
    icon: 'x-cloud.png'
  },
  share: {
    text: 'Share this selection',
    icon: 'upload-cloud.png'
  }
}

module.exports = class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const title = titleTypes[this.props.type]

    return (
      <div id="share-header">
        <header>
          <div className="top-section">
            <div className="logo-container">
              <div className="logo">
                <img src="plugin/images/dribbble-logo.png" />
              </div>
            </div>

            <Dropdown dialog={this.props.dialog} />
          </div>

          <p className="title">
            <img src={`plugin/images/${title.icon}`} />
            <span>{title.text}</span>
          </p>

          <div className="border" />
        </header>
      </div>
    )
  }
}
